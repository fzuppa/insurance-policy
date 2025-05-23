import PaymentForm from '@/components/checkout/PaymentForm';
import { getPolicyById } from '@/data/policies';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface CheckoutPageProps {
  params: { policyId: string };
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const policy = getPolicyById(params.policyId);
  if (!policy) {
    return {
      title: 'Policy Not Found | PolicyPilot',
    };
  }
  return {
    title: `Checkout: ${policy.name} | PolicyPilot`,
    description: `Complete your purchase for ${policy.name}.`,
  };
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const policy = getPolicyById(params.policyId);

  if (!policy) {
    notFound();
  }
  
  const { Icon } = policy;

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Checkout</h1>
        <p className="text-lg text-foreground max-w-xl mx-auto">
          You're almost there! Review your selected policy and complete your purchase.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader className="relative">
             <div className="relative w-full h-56 mb-4 rounded-t-md overflow-hidden">
              <Image 
                src={`https://placehold.co/600x300.png`} 
                alt={`${policy.name} placeholder image`}
                layout="fill"
                objectFit="cover"
                data-ai-hint={policy.dataAiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <CardTitle className="text-3xl text-white">{policy.name}</CardTitle>
              </div>
            </div>
            <div className="absolute top-6 right-6 p-3 bg-background/90 rounded-full shadow-lg">
              <Icon className="h-10 w-10 text-primary" />
            </div>
            <CardDescription className="text-md">{policy.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold text-lg mb-2 text-foreground">Coverage Highlights:</h4>
            <ul className="space-y-1.5 text-muted-foreground mb-4">
              {policy.coverageDetails.map((detail, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 mt-4">
              <p className="text-2xl font-bold text-accent">
                Total: ${policy.pricePerMonth}
                <span className="text-base font-normal text-muted-foreground">/month</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <PaymentForm policy={policy} />
      </div>
    </div>
  );
}
