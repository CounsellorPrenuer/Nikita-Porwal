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
import { Loader2, CreditCard, AlertCircle, Tag, X, CheckCircle2 } from "lucide-react";

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

// Predefined coupon codes — add or edit as needed
const COUPON_CODES: Record<string, { discount: number; type: "percent" | "flat"; label: string }> = {
  "NIKITA10": { discount: 10, type: "percent", label: "10% off" },
  "NIKITA20": { discount: 20, type: "percent", label: "20% off" },
  "MENTORIA500": { discount: 500, type: "flat", label: "₹500 off" },
  "MENTORIA1000": { discount: 1000, type: "flat", label: "₹1,000 off" },
  "FIRST50": { discount: 50, type: "percent", label: "50% off" },
};

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

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: "percent" | "flat";
    label: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

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

  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (!selectedPackage || !appliedCoupon) return selectedPackage?.price || 0;
    if (appliedCoupon.type === "percent") {
      return Math.round(selectedPackage.price * (1 - appliedCoupon.discount / 100));
    }
    return Math.max(0, selectedPackage.price - appliedCoupon.discount);
  };

  const handleApplyCoupon = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    const coupon = COUPON_CODES[code];
    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }
    setAppliedCoupon({ code, ...coupon });
    toast({
      title: "Coupon Applied!",
      description: `${coupon.label} discount has been applied.`,
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const createOrderMutation = useMutation({
    mutationFn: async (data: {
      packageId: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      amount: number;
      couponCode?: string;
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
      setAppliedCoupon(null);
      setCouponCode("");
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

    const finalPrice = getDiscountedPrice();

    const options = {
      key: orderData.keyId,
      amount: finalPrice * 100,
      currency: orderData.currency,
      name: "EduVista",
      description: `${orderData.packageName} - ${selectedPackage?.categoryName}${appliedCoupon ? ` (Coupon: ${appliedCoupon.code})` : ""}`,
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

    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
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
      amount: getDiscountedPrice(),
      couponCode: appliedCoupon?.code,
    });
  };

  const isProcessing = createOrderMutation.isPending || verifyPaymentMutation.isPending;
  const discountedPrice = getDiscountedPrice();
  const hasDiscount = appliedCoupon && selectedPackage && discountedPrice < selectedPackage.price;

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
                <span className="flex items-center gap-2 flex-wrap">
                  {selectedPackage.name} — {selectedPackage.categoryName}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Price display */}
          {selectedPackage && (
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              {hasDiscount ? (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground line-through">
                    {selectedPackage.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-3xl font-extrabold text-primary">
                    {discountedPrice.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    You save {(selectedPackage.price - discountedPrice).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              ) : (
                <p className="text-3xl font-extrabold">
                  {selectedPackage.price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  })}
                </p>
              )}
            </div>
          )}

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Full Name</Label>
              <Input
                id="customer-name"
                placeholder="Enter your full name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
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
              />
            </div>

            {/* Coupon Code Section */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <Label className="flex items-center gap-1.5 text-sm">
                <Tag className="w-3.5 h-3.5" />
                Have a coupon code?
              </Label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between gap-2 p-3 rounded-md bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {appliedCoupon.code} — {appliedCoupon.label}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={handleRemoveCoupon}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyCoupon}
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-destructive">{couponError}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleProceedToPayment}
              disabled={isProcessing || !razorpayLoaded}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay {discountedPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  })}
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowCheckoutDialog(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
