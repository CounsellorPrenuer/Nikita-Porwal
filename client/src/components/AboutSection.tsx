import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Heart, Target, Users, ArrowRight } from "lucide-react";

const highlights = [
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Dedicated to transforming educational outcomes",
  },
  {
    icon: Heart,
    title: "Passionate Educator",
    description: "Committed to every student's success",
  },
  {
    icon: Target,
    title: "NEP Aligned",
    description: "Modern pedagogy meets proven methods",
  },
  {
    icon: Users,
    title: "Holistic Approach",
    description: "Students, parents, and teachers together",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About EduVista
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Meet{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Nikita Porwal
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              With over 15 years of experience in educational counseling, Nikita Porwal 
              has dedicated her career to transforming the educational journey of students 
              across all age groups. Her holistic approach addresses not just academic 
              performance, but emotional well-being, personality development, and future 
              career readiness.
            </p>
            <p className="text-muted-foreground mb-8">
              Specializing in personalized learning strategies aligned with the National 
              Education Policy (NEP), Nikita works closely with students, parents, and 
              teachers to create a supportive ecosystem that nurtures every child&apos;s 
              unique potential.
            </p>
            <Link href="/about">
              <Button className="gap-2" data-testid="button-learn-more">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <Card
                  key={item.title}
                  className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover-elevate transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
