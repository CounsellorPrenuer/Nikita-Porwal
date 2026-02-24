import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // First, attempt to save the contact in the database
      const response = await fetch("https://nikita-porwal.garyphadale.workers.dev/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save contact");
      }

      // Then, construct the subject and body for the email
      const subject = encodeURIComponent(`New Inquiry from ${data.name}`);
      const bodyText = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nInquiry Type: ${data.inquiryType}\n\nMessage:\n${data.message}`;
      const body = encodeURIComponent(bodyText);

      // Trigger the email
      window.location.href = `mailto:with.nikita@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Journey Today
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:with.nikita@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-email"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>with.nikita@gmail.com</span>
                </a>
                <a
                  href="tel:+919977777082"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-phone"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span>+91 99777 77082</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/nikita-porwal-802900282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-linkedin"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-md bg-green-500 flex items-center justify-center">
                  <SiWhatsapp className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Quick Chat</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant responses via WhatsApp for quick queries.
              </p>
              <a
                href="https://wa.me/919977777082?text=Hi%20Nikita,%20I'm%20interested%20in%20learning%20more%20about%20EduVista's%20counseling%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full gap-2 border-green-500/30 hover:bg-green-500/10">
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </Button>
              </a>
            </Card>
          </div>

          <Card className="lg:col-span-3 p-6 sm:p-8 bg-card/80 backdrop-blur-sm border-border/50">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your message has been sent successfully. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-inquiry-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="student">Student Counseling</SelectItem>
                              <SelectItem value="parent">Parent Guidance</SelectItem>
                              <SelectItem value="teacher">Teacher Training</SelectItem>
                              <SelectItem value="school">School Partnership</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your educational goals..."
                            className="min-h-32 resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-submit-contact"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </Form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
