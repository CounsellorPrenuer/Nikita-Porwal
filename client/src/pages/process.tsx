import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageSquare,
  ClipboardCheck,
  Target,
  Rocket,
  BarChart,
  Award,
  HelpCircle,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Initial Consultation",
    description:
      "Schedule a free 30-minute consultation to discuss your educational goals, challenges, and expectations. This helps us understand your unique situation.",
    details: [
      "Free of charge",
      "30-minute session",
      "Online or in-person options",
      "No commitment required",
    ],
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Comprehensive Assessment",
    description:
      "We conduct thorough assessments to understand learning styles, strengths, areas for growth, and any specific challenges that need addressing.",
    details: [
      "Learning style evaluation",
      "Academic performance review",
      "Personality assessment",
      "Goal identification",
    ],
  },
  {
    number: "03",
    icon: Target,
    title: "Personalized Plan",
    description:
      "Based on the assessment, we create a customized educational plan with clear milestones, strategies, and timelines tailored to your specific needs.",
    details: [
      "Custom learning roadmap",
      "Clear milestones set",
      "Resource recommendations",
      "Family involvement plan",
    ],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Implementation",
    description:
      "We begin regular counseling sessions, implementing the personalized plan with ongoing support, guidance, and adjustments as needed.",
    details: [
      "Regular sessions",
      "Practical exercises",
      "Real-time feedback",
      "Progress tracking",
    ],
  },
  {
    number: "05",
    icon: BarChart,
    title: "Progress Review",
    description:
      "Regular check-ins to evaluate progress, celebrate achievements, identify new challenges, and refine the approach for continued growth.",
    details: [
      "Monthly reviews",
      "Progress reports",
      "Strategy adjustments",
      "Parent updates",
    ],
  },
  {
    number: "06",
    icon: Award,
    title: "Achievement & Growth",
    description:
      "Celebrate milestones reached and set new goals for continued development. Our relationship extends beyond initial goals for lifelong learning support.",
    details: [
      "Goal completion",
      "Certificate of achievement",
      "Future roadmap",
      "Alumni support network",
    ],
  },
];

const faqs = [
  {
    question: "How long does the counseling process take?",
    answer:
      "The duration varies based on individual needs. Some see significant progress in 3-6 months, while others benefit from ongoing support throughout an academic year or longer.",
  },
  {
    question: "Do you offer online sessions?",
    answer:
      "Yes! We offer both in-person and online counseling sessions to accommodate different preferences and locations.",
  },
  {
    question: "Is there a minimum age for student counseling?",
    answer:
      "We work with students from elementary school through higher education. Our approaches are adapted for each age group and developmental stage.",
  },
  {
    question: "How are parents involved in the process?",
    answer:
      "Parents are integral partners. We provide regular updates, include parents in goal-setting, and offer parent guidance sessions to support the child's development at home.",
  },
  {
    question: "What makes EduVista different from other counseling services?",
    answer:
      "Our holistic, NEP-aligned approach, 15+ years of experience, and focus on the entire educational ecosystem (students, parents, teachers) sets us apart.",
  },
];

export default function Process() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Our Process
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Your Journey to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Educational Excellence
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A proven, step-by-step approach to transforming educational 
              outcomes for students, parents, and educators.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-8"
                >
                  <div className="flex-shrink-0 flex items-start gap-4">
                    <div className="relative z-10 w-16 h-16 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <Card className="flex-1 p-6 bg-card/80 backdrop-blur-sm border-border/50">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQs
            </div>
            <h2 className="text-3xl font-bold">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="p-6 bg-card/80 backdrop-blur-sm border-border/50"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take the first step today with a free consultation. No commitment 
            required — just a conversation about your educational goals.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-schedule-consultation">
              Schedule Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
