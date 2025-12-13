import { useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Student Development & Personalized Learning",
    shortDesc: "Unlock every student's unique potential through customized learning pathways.",
    fullDesc:
      "Our comprehensive student development program identifies individual learning styles, strengths, and growth areas to create personalized educational roadmaps. We focus on both academic excellence and holistic development.",
    features: [
      "Individual learning style assessment",
      "Customized study plans and schedules",
      "Academic performance tracking and optimization",
      "Career exploration and goal setting",
      "Emotional intelligence development",
      "Exam preparation and test-taking strategies",
      "Time management and organizational skills",
      "Confidence building and public speaking",
    ],
    duration: "Ongoing sessions",
    popular: true,
  },
  {
    icon: Users,
    title: "Parent Guidance and Awareness",
    shortDesc: "Empowering parents to become effective educational partners.",
    fullDesc:
      "We believe parents are crucial partners in their child's educational journey. Our guidance programs provide tools, strategies, and insights to help parents create supportive home learning environments.",
    features: [
      "Understanding modern educational approaches",
      "Effective parent-child communication",
      "Supporting homework without doing it",
      "Managing academic stress and anxiety",
      "Digital literacy and screen time management",
      "Recognizing learning difficulties early",
      "Building intrinsic motivation",
      "Parent-teacher collaboration strategies",
    ],
    duration: "Workshop series",
    popular: false,
  },
  {
    icon: BookOpen,
    title: "Teacher Mentoring",
    shortDesc: "Professional development for educators to excel in modern classrooms.",
    fullDesc:
      "Our teacher mentoring program equips educators with cutting-edge pedagogical techniques, classroom management strategies, and tools to create engaging, student-centered learning experiences.",
    features: [
      "NEP-aligned teaching methodologies",
      "Active learning and engagement techniques",
      "Differentiated instruction strategies",
      "Assessment and feedback best practices",
      "Technology integration in classrooms",
      "Managing diverse learning needs",
      "Building inclusive classroom environments",
      "Professional growth and self-care",
    ],
    duration: "6-month program",
    popular: false,
  },
  {
    icon: Lightbulb,
    title: "Holistic NEP-Aligned Growth",
    shortDesc: "Comprehensive development aligned with National Education Policy.",
    fullDesc:
      "Our flagship program integrates all aspects of the National Education Policy to provide well-rounded development covering academics, creativity, physical wellness, and social-emotional learning.",
    features: [
      "Multidisciplinary learning integration",
      "Skill-based education focus",
      "Creative and critical thinking development",
      "Physical and mental wellness programs",
      "Values and ethics education",
      "Experiential and project-based learning",
      "21st-century skills development",
      "Continuous assessment and feedback",
    ],
    duration: "Academic year program",
    popular: true,
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  return (
    <main className="pt-20">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Our Services
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Educational Solutions
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From individual student counseling to school-wide programs, we offer 
              tailored solutions for every educational need.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="group p-8 bg-card/80 backdrop-blur-sm border-border/50 hover-elevate cursor-pointer transition-all duration-300 relative"
                onClick={() => setSelectedService(service)}
                data-testid={`card-service-detail-${index}`}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white border-0">
                    Popular
                  </Badge>
                )}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{service.shortDesc}</p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EduVista?
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: "Proven Track Record",
                desc: "15+ years of successful educational counseling with 98% success rate.",
              },
              {
                icon: Users,
                title: "Personalized Approach",
                desc: "Every program is tailored to individual needs and goals.",
              },
              {
                icon: BookOpen,
                title: "NEP Aligned",
                desc: "All programs follow National Education Policy guidelines.",
              },
              {
                icon: CheckCircle,
                title: "Holistic Development",
                desc: "We focus on academic, emotional, and social growth.",
              },
              {
                icon: GraduationCap,
                title: "Expert Guidance",
                desc: "Led by certified educational counselors and specialists.",
              },
              {
                icon: Lightbulb,
                title: "Modern Methods",
                desc: "Combining traditional wisdom with innovative techniques.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="p-6 bg-card/80 backdrop-blur-sm border-border/50"
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book a free consultation to discuss your educational needs and find 
            the right program for you.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-book-consultation">
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              {selectedService && (
                <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <selectedService.icon className="w-7 h-7 text-white" />
                </div>
              )}
              <div>
                <DialogTitle className="text-xl">{selectedService?.title}</DialogTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Clock className="w-4 h-4" />
                  {selectedService?.duration}
                </div>
              </div>
            </div>
            <DialogDescription className="text-base">
              {selectedService?.fullDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <h4 className="font-semibold mb-4">What&apos;s Included:</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {selectedService?.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/contact" className="flex-1">
              <Button className="w-full" onClick={() => setSelectedService(null)}>
                Inquire Now
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setSelectedService(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
