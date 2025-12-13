import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  GraduationCap,
  Users,
  BookOpen,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Student Development",
    shortDesc: "Personalized learning paths for every student",
    fullDesc:
      "Our student development program focuses on identifying each student's unique learning style, strengths, and areas for growth. We create customized learning plans that boost academic performance while nurturing emotional intelligence and critical thinking skills.",
    features: [
      "Personalized learning assessments",
      "Academic performance optimization",
      "Study skills and time management",
      "Exam preparation strategies",
      "Career guidance and counseling",
    ],
  },
  {
    icon: Users,
    title: "Parent Guidance",
    shortDesc: "Empowering parents to support their children",
    fullDesc:
      "We believe parents are essential partners in education. Our parent guidance program provides tools and strategies to create a supportive home learning environment, understand modern educational approaches, and effectively communicate with their children about academic and personal growth.",
    features: [
      "Understanding your child's learning style",
      "Effective communication techniques",
      "Supporting homework and study habits",
      "Managing screen time and digital learning",
      "Addressing academic stress and anxiety",
    ],
  },
  {
    icon: BookOpen,
    title: "Teacher Mentoring",
    shortDesc: "Professional development for educators",
    fullDesc:
      "Our teacher mentoring program enhances classroom effectiveness through modern pedagogical techniques, student engagement strategies, and personalized support. We help educators stay current with NEP guidelines and implement student-centered learning approaches.",
    features: [
      "NEP-aligned teaching methodologies",
      "Classroom management strategies",
      "Student engagement techniques",
      "Assessment and feedback best practices",
      "Technology integration in education",
    ],
  },
  {
    icon: Lightbulb,
    title: "Holistic NEP Growth",
    shortDesc: "Comprehensive development aligned with NEP",
    fullDesc:
      "Our holistic growth program aligns with the National Education Policy to provide well-rounded development. We focus on academic excellence, creativity, physical well-being, and social-emotional learning to prepare students for success in the 21st century.",
    features: [
      "Multidisciplinary learning approaches",
      "Skill-based education focus",
      "Creative and critical thinking development",
      "Physical and mental wellness integration",
      "Values and ethics education",
    ],
  },
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Educational Solutions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tailored counseling services designed to support every stakeholder in 
            the educational journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group p-6 bg-card/80 backdrop-blur-sm border-border/50 hover-elevate cursor-pointer transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedService(service)}
              data-testid={`card-service-${index}`}
            >
              <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.shortDesc}</p>
              <Button variant="ghost" size="sm" className="gap-2 p-0">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {selectedService && (
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <selectedService.icon className="w-5 h-5 text-white" />
                </div>
              )}
              <DialogTitle className="text-xl">{selectedService?.title}</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              {selectedService?.fullDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h4 className="font-semibold mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {selectedService?.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Button className="w-full" onClick={() => setSelectedService(null)}>
              Get Started
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
