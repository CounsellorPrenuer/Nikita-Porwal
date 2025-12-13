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
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  preferredTime: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      preferredTime: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // todo: remove mock functionality - connect to backend
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 5000);
  };

  return (
    <main className="pt-20">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Get in Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transformation
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or ready to begin your educational journey? 
              We&apos;re here to help. Reach out and let&apos;s create something amazing together.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-lg mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <a
                    href="mailto:with.nikita@gmail.com"
                    className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                    data-testid="link-contact-email"
                  >
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-sm">with.nikita@gmail.com</div>
                    </div>
                  </a>
                  <a
                    href="tel:+919977777082"
                    className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                    data-testid="link-contact-phone"
                  >
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      <div className="text-sm">+91 99777 77082</div>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nikita-porwal-802900282"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                    data-testid="link-contact-linkedin"
                  >
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">LinkedIn</div>
                      <div className="text-sm">Connect with Nikita</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Working Hours</div>
                      <div className="text-sm text-muted-foreground">
                        Mon - Sat: 9:00 AM - 7:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-md bg-green-500 flex items-center justify-center">
                    <SiWhatsapp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">Quick responses</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant responses for quick queries via WhatsApp. Available 
                  during working hours.
                </p>
                <a
                  href="https://wa.me/919977777082?text=Hi%20Nikita,%20I'm%20interested%20in%20learning%20more%20about%20EduVista's%20counseling%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full gap-2 bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </Card>
            </div>

            <Card className="lg:col-span-2 p-6 sm:p-8 bg-card/80 backdrop-blur-sm border-border/50">
              <h3 className="font-semibold text-xl mb-6">Send Us a Message</h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Thank You!</h3>
                  <p className="text-muted-foreground max-w-md">
                    Your message has been sent successfully. We&apos;ll review your 
                    inquiry and get back to you within 24 hours.
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
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} data-testid="input-contact-name" />
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} data-testid="input-contact-email" />
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
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} data-testid="input-contact-phone" />
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
                            <FormLabel>Inquiry Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-inquiry">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="student">Student Counseling</SelectItem>
                                <SelectItem value="parent">Parent Guidance</SelectItem>
                                <SelectItem value="teacher">Teacher Training</SelectItem>
                                <SelectItem value="school">School Partnership</SelectItem>
                                <SelectItem value="workshop">Workshop Inquiry</SelectItem>
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
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Contact Time (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-contact-time">
                                <SelectValue placeholder="Select preferred time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                              <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                              <SelectItem value="anytime">Anytime</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your educational goals, challenges, or any specific questions you have..."
                              className="min-h-36 resize-none"
                              {...field}
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={form.formState.isSubmitting}
                      data-testid="button-contact-submit"
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
    </main>
  );
}
