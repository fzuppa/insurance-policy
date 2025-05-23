import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Users, BarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background rounded-xl shadow-lg">
        <div className="container mx-auto px-4">
          <ShieldCheck className="mx-auto h-20 w-20 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Welcome to PolicyPilot
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Navigate your insurance options with ease. We provide clear, reliable policies tailored to your life.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/get-quote">Get a Personalized Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/policies">Explore Policies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">Why Choose PolicyPilot?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl">Tailored Policies</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Our AI helps you find insurance that perfectly fits your needs and budget.
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-accent/10 rounded-full mb-2">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl">Customer First</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Dedicated support and a seamless online experience from quote to claim.
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <BarChart className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl">Transparent Pricing</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              No hidden fees. Clear, upfront pricing so you know exactly what you're paying for.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 bg-card rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">Simple Steps to Get Insured</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Insurance process illustration"
              layout="fill"
              objectFit="cover"
              data-ai-hint="insurance process"
            />
          </div>
          <ol className="space-y-6">
            {[
              { title: "Tell Us About Yourself", description: "Fill out a simple form with your details and coverage needs." },
              { title: "Get AI Recommendations", description: "Our smart engine suggests the best policies for you." },
              { title: "Choose Your Plan", description: "Compare options and select the policy that suits you." },
              { title: "Secure & Purchase", description: "Easily pay online and get your policy documents instantly." },
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-md">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
