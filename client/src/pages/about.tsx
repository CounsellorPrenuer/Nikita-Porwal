import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Heart,
  Target,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import nikitaPhoto from "@assets/NikitaPorwal1_-_Nikita_Porwal_1765611684547.JPG";

const timeline = [
  {
    year: "2008",
    title: "Beginning of the Journey",
    description: "Started educational counseling practice with a focus on student development.",
  },
  {
    year: "2012",
    title: "Expanded Services",
    description: "Introduced parent guidance programs and teacher mentoring workshops.",
  },
  {
    year: "2016",
    title: "100+ School Partnerships",
    description: "Reached milestone of partnering with over 100 schools across regions.",
  },
  {
    year: "2020",
    title: "NEP Alignment",
    description: "Redesigned all programs to align with National Education Policy guidelines.",
  },
  {
    year: "2024",
    title: "EduVista Launch",
    description: "Launched EduVista as a comprehensive educational counseling platform.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Empathy First",
    description: "Understanding each student's unique journey and challenges.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Setting clear, achievable milestones for every learner.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Building partnerships between students, parents, and educators.",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "Striving for the highest standards in educational guidance.",
  },
];

const credentials = [
  "M.Ed. in Educational Psychology",
  "Certified NEP Implementation Specialist",
  "Licensed School Counselor",
  "Trained in Child Development & Learning Disabilities",
  "Workshop Facilitator - 100+ Seminars Conducted",
  "Published Researcher in Educational Methodologies",
];

export default function About() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About EduVista
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Transforming Education,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                One Student at a Time
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              EduVista is more than an educational counseling service — it&apos;s a 
              movement to revolutionize how students, parents, and teachers 
              approach learning and growth.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                The Founder
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Meet{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Nikita Porwal
                </span>
              </h2>
              <p className="text-muted-foreground mb-4">
                With over 15 years of dedicated experience in educational counseling, 
                Nikita Porwal has become a trusted name in transforming learning 
                experiences. Her journey began with a simple belief: every child 
                has unique potential waiting to be unlocked.
              </p>
              <p className="text-muted-foreground mb-6">
                Nikita&apos;s approach combines proven psychological methods with 
                modern pedagogical techniques, creating personalized roadmaps for 
                academic and personal success. She has worked with thousands of 
                students, helping them overcome challenges, discover their passions, 
                and achieve their dreams.
              </p>
              <div className="space-y-2 mb-8">
                {credentials.map((cred, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <Button className="gap-2" data-testid="button-connect">
                  Connect with Nikita
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
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
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Values
            </div>
            <h2 className="text-3xl font-bold mb-4">
              What{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Drives Us
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="p-6 bg-card/80 backdrop-blur-sm border-border/50 text-center"
              >
                <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl font-bold mb-4">
              15+ Years of{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <Card className="inline-block p-6 bg-card/80 backdrop-blur-sm border-border/50">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {item.year}
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </Card>
                    )}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />
                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <Card className="inline-block p-6 bg-card/80 backdrop-blur-sm border-border/50">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {item.year}
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Educational Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students, parents, and educators who have discovered 
            the EduVista difference.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-start-journey">
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
