import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles } from "lucide-react";

interface Package {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface Category {
  id: string;
  name: string;
  packages: Package[];
}

const pricingCategories: Category[] = [
  {
    id: "8-9",
    name: "8-9 Students",
    packages: [
      {
        name: "Discover",
        price: 5500,
        description: "Perfect for students starting their educational journey",
        features: [
          "Psychometric Assessment",
          "Strengths & Interests Mapping",
          "Subject Selection Guidance",
          "One-on-One Counseling Session",
          "Career Awareness Workshop",
          "Report with Recommendations",
        ],
      },
      {
        name: "Discover Plus+",
        price: 15000,
        description: "Comprehensive guidance for serious learners",
        features: [
          "Everything in Discover",
          "Advanced Aptitude Testing",
          "Multiple Counseling Sessions",
          "Parent-Teacher Guidance",
          "Skill Development Roadmap",
          "6-Month Follow-up Support",
          "Personalized Learning Plan",
          "Priority WhatsApp Support",
        ],
        highlighted: true,
      },
    ],
  },
  {
    id: "10-12",
    name: "10-12 Students",
    packages: [
      {
        name: "Achieve Online",
        price: 5999,
        description: "Stream selection and career pathway guidance",
        features: [
          "Stream Selection Assessment",
          "Aptitude & Interest Analysis",
          "Career Pathway Mapping",
          "Subject Combination Advice",
          "One-on-One Counseling",
          "Detailed Career Report",
        ],
      },
      {
        name: "Achieve Plus+",
        price: 10599,
        description: "Complete guidance for board exam students",
        features: [
          "Everything in Achieve Online",
          "Entrance Exam Preparation Tips",
          "College Selection Guidance",
          "Multiple Counseling Sessions",
          "Scholarship Information",
          "Study Abroad Consultation",
          "3-Month Follow-up Support",
          "Priority WhatsApp Support",
        ],
        highlighted: true,
      },
    ],
  },
  {
    id: "college",
    name: "College Graduates",
    packages: [
      {
        name: "Ascend Online",
        price: 6499,
        description: "Launch your career with expert guidance",
        features: [
          "Career Assessment",
          "Industry-Aligned Skill Analysis",
          "Resume Building Guidance",
          "Interview Preparation Tips",
          "Job Market Insights",
          "Career Roadmap Report",
        ],
      },
      {
        name: "Ascend Plus+",
        price: 10599,
        description: "Comprehensive career launch program",
        features: [
          "Everything in Ascend Online",
          "LinkedIn Profile Optimization",
          "Mock Interview Sessions",
          "Higher Education Guidance",
          "Industry Connect Sessions",
          "3-Month Career Support",
          "Personalized Growth Plan",
          "Priority WhatsApp Support",
        ],
        highlighted: true,
      },
    ],
  },
  {
    id: "working",
    name: "Working Professionals",
    packages: [
      {
        name: "Ascend Online",
        price: 6499,
        description: "Navigate your career transition successfully",
        features: [
          "Career Transition Assessment",
          "Skill Gap Analysis",
          "Industry Trend Insights",
          "Personal Branding Strategy",
          "One-on-One Counseling",
          "Career Pivot Roadmap",
        ],
      },
      {
        name: "Ascend Plus+",
        price: 10599,
        description: "Complete career transformation program",
        features: [
          "Everything in Ascend Online",
          "Executive Resume Building",
          "Leadership Coaching Session",
          "Networking Strategy",
          "Upskilling Recommendations",
          "3-Month Career Mentoring",
          "Priority WhatsApp Support",
          "Exclusive Webinar Access",
        ],
        highlighted: true,
      },
    ],
  },
];

interface PricingSectionProps {
  onSelectPackage?: (category: string, packageName: string, price: number) => void;
}

export function PricingSection({ onSelectPackage }: PricingSectionProps) {
  const [activeTab, setActiveTab] = useState("8-9");

  const handleSelectPackage = (category: Category, pkg: Package) => {
    if (onSelectPackage) {
      onSelectPackage(category.name, pkg.name, pkg.price);
    }
  };

  return (
    <section className="py-24" id="pricing">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 h-auto p-1 bg-muted/50 backdrop-blur-sm">
            {pricingCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="py-3 px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
                data-testid={`tab-${category.id}`}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {pricingCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {category.packages.map((pkg, index) => (
                  <Card
                    key={pkg.name}
                    className={`relative p-8 transition-all duration-300 hover-elevate ${
                      pkg.highlighted
                        ? "border-primary/50 bg-gradient-to-b from-primary/5 to-transparent"
                        : "bg-card/80 backdrop-blur-sm border-border/50"
                    }`}
                    data-testid={`card-package-${category.id}-${index}`}
                  >
                    {pkg.highlighted && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">
                          {pkg.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      {pkg.originalPrice && (
                        <p className="text-muted-foreground text-sm line-through mt-1">
                          {pkg.originalPrice.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        pkg.highlighted
                          ? "bg-gradient-to-r from-primary to-accent hover:opacity-90"
                          : ""
                      }`}
                      variant={pkg.highlighted ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleSelectPackage(category, pkg)}
                      data-testid={`button-select-${category.id}-${index}`}
                    >
                      Choose {pkg.name}
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a customized package? We can create one just for you.
          </p>
          <Button variant="outline" size="lg" data-testid="button-custom-package">
            Contact for Custom Package
          </Button>
        </div>
      </div>
    </section>
  );
}
