import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  CreditCard,
  MousePointer,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  FileText,
  Target,
  TrendingUp,
  Activity,
} from "lucide-react";
import { SiWhatsapp, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
import type { User } from "@shared/schema";

interface WebsiteButton {
  name: string;
  location: string;
  action: string;
  type: "navigation" | "payment" | "external" | "scroll" | "modal";
}

const websiteButtons: WebsiteButton[] = [
  { name: "Get Started", location: "Header Navigation", action: "Navigate to /contact", type: "navigation" },
  { name: "Start Your Journey", location: "Hero Section", action: "Navigate to /contact", type: "navigation" },
  { name: "Explore Services", location: "Hero Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (8-9 Students)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (10-12 Students)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (College Graduates)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (Working Professionals)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Discover (8-9)", location: "Pricing Page", action: "Razorpay Checkout - Rs 5,500", type: "payment" },
  { name: "Discover Plus+ (8-9)", location: "Pricing Page", action: "Razorpay Checkout - Rs 15,000", type: "payment" },
  { name: "Achieve Online (10-12)", location: "Pricing Page", action: "Razorpay Checkout - Rs 5,999", type: "payment" },
  { name: "Achieve Plus+ (10-12)", location: "Pricing Page", action: "Razorpay Checkout - Rs 10,599", type: "payment" },
  { name: "Ascend Online (College)", location: "Pricing Page", action: "Razorpay Checkout - Rs 6,499", type: "payment" },
  { name: "Ascend Plus+ (College)", location: "Pricing Page", action: "Razorpay Checkout - Rs 10,599", type: "payment" },
  { name: "Ascend Online (Working)", location: "Pricing Page", action: "Razorpay Checkout - Rs 6,499", type: "payment" },
  { name: "Ascend Plus+ (Working)", location: "Pricing Page", action: "Razorpay Checkout - Rs 10,599", type: "payment" },
  { name: "Contact for Custom Package", location: "Pricing Page", action: "Navigate to /contact", type: "navigation" },
  { name: "Book Consultation", location: "Powered By Section", action: "Navigate to /contact", type: "navigation" },
  { name: "Book Free Consultation", location: "Services Page", action: "Navigate to /contact", type: "navigation" },
  { name: "Inquire Now", location: "Service Detail Modal", action: "Navigate to /contact", type: "modal" },
  { name: "WhatsApp Float Button", location: "Footer (Fixed)", action: "Open WhatsApp Chat", type: "external" },
  { name: "Back to Top", location: "Footer", action: "Scroll to top of page", type: "scroll" },
  { name: "Instagram Link", location: "Footer Social", action: "Open Instagram profile", type: "external" },
  { name: "LinkedIn Link", location: "Footer Social", action: "Open LinkedIn profile", type: "external" },
  { name: "YouTube Link", location: "Footer Social", action: "Open YouTube channel", type: "external" },
  { name: "Navigation Links", location: "Header & Footer", action: "Navigate to respective pages", type: "navigation" },
];

const pageInfo = [
  { name: "Home", path: "/", description: "Landing page with hero, services overview, stats, testimonials, and contact form" },
  { name: "About", path: "/about", description: "Company story, mission, vision, and team information" },
  { name: "Services", path: "/services", description: "Detailed service offerings with modal popups for each service" },
  { name: "Pricing", path: "/pricing", description: "Package pricing with Razorpay payment integration" },
  { name: "Process", path: "/process", description: "Step-by-step counseling process explanation" },
  { name: "Contact", path: "/contact", description: "Contact form and business contact information" },
];

function getTypeColor(type: WebsiteButton["type"]) {
  switch (type) {
    case "navigation": return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "payment": return "bg-green-500/10 text-green-600 dark:text-green-400";
    case "external": return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
    case "scroll": return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    case "modal": return "bg-pink-500/10 text-pink-600 dark:text-pink-400";
    default: return "bg-muted text-muted-foreground";
  }
}

export default function Admin() {
  const { user } = useAuth();
  const typedUser = user as User | undefined;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="text-admin-title">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {typedUser?.firstName || typedUser?.email || "Admin"}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Pages</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-pages">6</div>
                <p className="text-xs text-muted-foreground">Active website pages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Interactive Elements</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-buttons">{websiteButtons.length}</div>
                <p className="text-xs text-muted-foreground">Buttons & CTAs tracked</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pricing Packages</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-packages">8</div>
                <p className="text-xs text-muted-foreground">Active packages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Payment Gateway</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="text-payment-status">Active</div>
                <p className="text-xs text-muted-foreground">Razorpay integrated</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="buttons" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid" data-testid="tabs-admin">
              <TabsTrigger value="buttons" data-testid="tab-buttons">
                <MousePointer className="w-4 h-4 mr-2 hidden sm:inline" />
                Buttons
              </TabsTrigger>
              <TabsTrigger value="pages" data-testid="tab-pages">
                <LayoutDashboard className="w-4 h-4 mr-2 hidden sm:inline" />
                Pages
              </TabsTrigger>
              <TabsTrigger value="packages" data-testid="tab-packages">
                <CreditCard className="w-4 h-4 mr-2 hidden sm:inline" />
                Packages
              </TabsTrigger>
              <TabsTrigger value="quick-actions" data-testid="tab-actions">
                <Target className="w-4 h-4 mr-2 hidden sm:inline" />
                Quick Actions
              </TabsTrigger>
            </TabsList>

            {/* Buttons Tab */}
            <TabsContent value="buttons" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="w-5 h-5" />
                    Website Buttons & CTAs
                  </CardTitle>
                  <CardDescription>
                    Complete documentation of all interactive elements on the website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Button Name</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {websiteButtons.map((btn, index) => (
                          <tr key={index} className="border-b border-border/50 hover-elevate" data-testid={`row-button-${index}`}>
                            <td className="py-3 px-4 font-medium">{btn.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{btn.location}</td>
                            <td className="py-3 px-4 text-muted-foreground">{btn.action}</td>
                            <td className="py-3 px-4">
                              <Badge variant="secondary" className={getTypeColor(btn.type)}>
                                {btn.type}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pages Tab */}
            <TabsContent value="pages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5" />
                    Website Pages
                  </CardTitle>
                  <CardDescription>
                    All pages in the EduVista website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pageInfo.map((page, index) => (
                      <Card key={index} className="hover-elevate" data-testid={`card-page-${index}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-between gap-2">
                            {page.name}
                            <a href={page.path} target="_blank" rel="noopener noreferrer">
                              <Button size="icon" variant="ghost">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </a>
                          </CardTitle>
                          <Badge variant="outline" className="w-fit">{page.path}</Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{page.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pricing Packages
                  </CardTitle>
                  <CardDescription>
                    All counseling packages with Razorpay integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* 8-9 Students */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        8-9 Students
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-8-9-discover">
                          <span>Discover</span>
                          <Badge>Rs 5,500</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-8-9-discover-plus">
                          <span>Discover Plus+</span>
                          <Badge>Rs 15,000</Badge>
                        </div>
                      </div>
                    </div>

                    {/* 10-12 Students */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        10-12 Students
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-10-12-achieve">
                          <span>Achieve Online</span>
                          <Badge>Rs 5,999</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-10-12-achieve-plus">
                          <span>Achieve Plus+</span>
                          <Badge>Rs 10,599</Badge>
                        </div>
                      </div>
                    </div>

                    {/* College Graduates */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        College Graduates
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-college-ascend">
                          <span>Ascend Online</span>
                          <Badge>Rs 6,499</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-college-ascend-plus">
                          <span>Ascend Plus+</span>
                          <Badge>Rs 10,599</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Working Professionals */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Working Professionals
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-working-ascend">
                          <span>Ascend Online</span>
                          <Badge>Rs 6,499</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-working-ascend-plus">
                          <span>Ascend Plus+</span>
                          <Badge>Rs 10,599</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quick Actions Tab */}
            <TabsContent value="quick-actions" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Website Links
                    </CardTitle>
                    <CardDescription>Quick access to all pages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {pageInfo.map((page, index) => (
                      <a key={index} href={page.path} className="block" data-testid={`link-page-${index}`}>
                        <Button variant="outline" className="w-full justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {page.name}
                        </Button>
                      </a>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>Business contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium" data-testid="text-contact-email">with.nikita@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium" data-testid="text-contact-phone">+91 99777 77082</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <a href="https://wa.me/919977777082" target="_blank" rel="noopener noreferrer" data-testid="link-whatsapp">
                        <Button size="icon" variant="outline">
                          <SiWhatsapp className="w-4 h-4" />
                        </Button>
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" data-testid="link-instagram">
                        <Button size="icon" variant="outline">
                          <SiInstagram className="w-4 h-4" />
                        </Button>
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                        <Button size="icon" variant="outline">
                          <SiLinkedin className="w-4 h-4" />
                        </Button>
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" data-testid="link-youtube">
                        <Button size="icon" variant="outline">
                          <SiYoutube className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Button Type Legend
                    </CardTitle>
                    <CardDescription>Understanding the button types on the website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getTypeColor("navigation")}>navigation</Badge>
                        <span className="text-sm text-muted-foreground">Navigates between pages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getTypeColor("payment")}>payment</Badge>
                        <span className="text-sm text-muted-foreground">Initiates Razorpay checkout</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getTypeColor("external")}>external</Badge>
                        <span className="text-sm text-muted-foreground">Opens external link</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getTypeColor("scroll")}>scroll</Badge>
                        <span className="text-sm text-muted-foreground">Scrolls within page</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getTypeColor("modal")}>modal</Badge>
                        <span className="text-sm text-muted-foreground">Opens modal/dialog</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
