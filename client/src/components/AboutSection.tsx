import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Heart, Target, Users, ArrowRight } from "lucide-react";
import nikitaPhoto from "@assets/nikita-porwal.jpg";

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
            <div className="relative">
              <div className="aspect-[4/5] rounded-md overflow-hidden shadow-2xl">
                <img
                  src={nikitaPhoto}
                  alt="Nikita Porwal - Educational Counselor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
