import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Building2, GraduationCap, Video, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Students and Professionals Mentored",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Building2,
    value: "100+",
    label: "School Partners",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: GraduationCap,
    value: "50+",
    label: "College Collaborations",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: Video,
    value: "200+",
    label: "Hours of Career Webinars",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
];

export function PoweredBySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powered by EduVista's{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Career Discovery Platform
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Every EduVista consultation includes lifetime access to our comprehensive 
            platform for career discovery, mentorship, and lifelong upskilling.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="p-6 bg-card/80 backdrop-blur-sm border-border/50 text-center hover-elevate transition-all duration-300"
              data-testid={`card-stat-${index}`}
            >
              <div className={`w-16 h-16 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-book-consultation-stats">
              Book Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
