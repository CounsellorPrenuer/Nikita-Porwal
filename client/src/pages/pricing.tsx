import { useState, useEffect } from "react";
import { PricingSection } from "@/components/PricingSection";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayConfig {
  configured: boolean;
  keyId: string | null;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export default function Pricing() {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<{
    packageId: string;
    name: string;
    price: number;
    categoryName: string;
  } | null>(null);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const { data: razorpayConfig } = useQuery<RazorpayConfig>({
    queryKey: ["/api/razorpay/config"],
  });

  useEffect(() => {
    if (!document.getElementById("razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  const createOrderMutation = useMutation({
    mutationFn: async (data: {
      packageId: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
    }) => {
      const response = await apiRequest("POST", "/api/razorpay/create-order", data);
      return response.json();
    },
    onSuccess: (data) => {
      openRazorpayCheckout(data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create order",
        variant: "destructive",
      });
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: async (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      const response = await apiRequest("POST", "/api/razorpay/verify-payment", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Payment Successful!",
        description: "Thank you for your purchase. We will contact you shortly.",
      });
      setShowCheckoutDialog(false);
      setSelectedPackage(null);
      setCustomerInfo({ name: "", email: "", phone: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Payment Verification Failed",
        description: error.message || "Please contact support",
        variant: "destructive",
      });
    },
  });

  const openRazorpayCheckout = (orderData: {
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    packageName: string;
    packagePrice: number;
  }) => {
    if (!window.Razorpay) {
      toast({
        title: "Error",
        description: "Payment system not loaded. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "EduVista",
      description: `${orderData.packageName} - ${selectedPackage?.categoryName}`,
      order_id: orderData.orderId,
      handler: function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        verifyPaymentMutation.mutate({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.phone,
      },
      theme: {
        color: "#7c3aed",
      },
      modal: {
        ondismiss: function () {
          toast({
            title: "Payment Cancelled",
            description: "You can try again when you're ready.",
          });
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const handleSelectPackage = (packageId: string, name: string, price: number, categoryName: string) => {
    setSelectedPackage({ packageId, name, price, categoryName });
    
    if (!razorpayConfig?.configured) {
      toast({
        title: "Payment Not Available",
        description: "Payment system is being configured. Please contact us for manual booking.",
      });
      return;
    }
    
    setShowCheckoutDialog(true);
  };

  const handleProceedToPayment = () => {
    if (!selectedPackage) return;
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (customerInfo.phone.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    createOrderMutation.mutate({
      packageId: selectedPackage.packageId,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
    });
  };

  const isProcessing = createOrderMutation.isPending || verifyPaymentMutation.isPending;

  return (
    <main className="pt-16">
      <div className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible packages designed to meet your educational counseling needs at every stage.
          </p>
        </div>
      </div>
      
      {!razorpayConfig?.configured && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                Online payment is currently being set up
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">
                Please contact us directly to book your package. We'll have online payments available soon!
              </p>
            </div>
          </div>
        </div>
      )}
      
      <PricingSection onSelectPackage={handleSelectPackage} />

      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Complete Your Purchase
            </DialogTitle>
            <DialogDescription>
              {selectedPackage && (
                <>
                  {selectedPackage.name} package for {selectedPackage.categoryName} -{" "}
                  <span className="font-semibold text-foreground">
                    {selectedPackage.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Full Name</Label>
              <Input
                id="customer-name"
                placeholder="Enter your full name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                data-testid="input-customer-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email Address</Label>
              <Input
                id="customer-email"
                type="email"
                placeholder="Enter your email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                data-testid="input-customer-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Phone Number</Label>
              <Input
                id="customer-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                data-testid="input-customer-phone"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleProceedToPayment}
              disabled={isProcessing || !razorpayLoaded}
              className="w-full bg-gradient-to-r from-primary to-accent"
              data-testid="button-proceed-payment"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowCheckoutDialog(false)}
              disabled={isProcessing}
              data-testid="button-cancel-payment"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
