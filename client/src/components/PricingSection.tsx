import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Loader2, ArrowRight, CreditCard } from "lucide-react";
import { sanityClient } from "@/lib/sanity";

interface Package {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  paymentButtonId?: string;
}

interface Category {
  id: string;
  name: string;
  packages: Package[];
}

interface CustomPackage {
  _id?: string;
  id: string;
  title: string;
  description: string;
  price: number;
}

interface PricingSectionProps {
  onSelectPackage?: (packageId: string, packageName: string, price: number, categoryName: string) => void;
}

export function PricingSection({ onSelectPackage }: PricingSectionProps) {
  const [activeTab, setActiveTab] = useState("");
  const [pricingCategories, setPricingCategories] = useState<Category[]>([]);
  const [customPackages, setCustomPackages] = useState<CustomPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const response = await fetch(`${import.meta.env.VITE_RAZORPAY_WORKER_URL || 'https://nikitaporwal-worker.garyphadale.workers.dev'}/api/pricing`);
        if (!response.ok) throw new Error("Failed to fetch pricing");
        const data = await response.json();
        
        setPricingCategories(data.categories || []);
        setCustomPackages(data.customPackages || []);

        if (data.categories && data.categories.length > 0) {
          setActiveTab(data.categories[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch pricing from worker", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPricing();
  }, []);

  const handleSelectPackage = (category: Category, pkg: Package) => {
    if (onSelectPackage) {
      onSelectPackage(pkg.id, pkg.name, pkg.price, category.name);
    }
  };

  const handleSelectCustomPackage = (pkg: CustomPackage) => {
    if (onSelectPackage) {
      onSelectPackage(pkg.id, pkg.title, pkg.price, "Custom Plan");
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Our Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Investment in Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the perfect counseling package tailored to your educational stage and goals.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {pricingCategories.length > 0 ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-24">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 h-auto p-1 bg-muted/50 backdrop-blur-sm">
                  {pricingCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="py-3 px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {pricingCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                      {category.packages.map((pkg, index) => (
                        <Card
                          key={pkg.id}
                          className={`relative p-8 transition-all duration-300 hover-elevate overflow-hidden flex flex-col ${pkg.highlighted
                            ? "border-primary/50 shadow-lg"
                            : "bg-card/80 backdrop-blur-sm border-border/50"
                            }`}
                        >
                          {pkg.highlighted && (
                            <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                          )}

                          {pkg.highlighted && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white border-0 z-10 px-3 py-1">
                              <Sparkles className="w-3.5 h-3.5 mr-1" />
                              Most Popular
                            </Badge>
                          )}

                          <div className="text-center mb-6 relative z-10">
                            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                            <p className="text-muted-foreground text-sm mb-4 h-10">{pkg.description}</p>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-4xl font-extrabold tracking-tight">
                                {pkg.price.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            </div>
                          </div>

                          <ul className="space-y-4 mb-8 relative z-10 flex-grow">
                            {pkg.features?.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span className="text-sm text-foreground/90 leading-relaxed font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="relative z-10 pt-4 mt-auto">
                            <Button
                              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all group"
                              size="lg"
                              onClick={() => handleSelectPackage(category, pkg)}
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Buy Now
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : null}

            {customPackages.length > 0 && (
              <div className="mt-20 pt-16 border-t border-border/50">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h3 className="text-2xl font-bold mb-3">Want To Customise Your Mentorship Plan?</h3>
                  <p className="text-muted-foreground">If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {customPackages.map((pkg) => (
                    <Card key={pkg.id} className="p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
                      <div className="mb-4 flex-grow">
                        <h4 className="text-lg font-bold mb-2 leading-tight">{pkg.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                        <span className="font-bold text-lg">
                          {pkg.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white group"
                          onClick={() => handleSelectCustomPackage(pkg)}
                        >
                          <CreditCard className="w-3 h-3 mr-1.5" />
                          Buy Now
                          <ArrowRight className="w-3 h-3 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-4">
                Not sure which package is right for you?
              </p>
              <Link href="/contact">
                <Button variant="ghost" className="gap-2">
                  Contact Us for Help
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
