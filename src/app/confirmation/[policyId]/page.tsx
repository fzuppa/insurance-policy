import { getPolicyById } from '@/data/policies';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Download, FileText } from 'lucide-react';
import Image from 'next/image';

interface ConfirmationPageProps {
  params: { policyId: string };
}

export async function generateMetadata({ params }: ConfirmationPageProps): Promise<Metadata> {
  const policy = getPolicyById(params.policyId);
  if (!policy) {
    return {
      title: 'Order Not Found | PolicyPilot',
    };
  }
  return {
    title: `Purchase Confirmed: ${policy.name} | PolicyPilot`,
    description: `Your purchase of ${policy.name} is confirmed.`,
  };
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const policy = getPolicyById(params.policyId);

  if (!policy) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Card className="w-full max-w-lg text-center shadow-xl">
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl text-primary">Purchase Confirmed!</CardTitle>
          <CardDescription className="text-lg text-foreground">
            Thank you for choosing PolicyPilot.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full h-40 rounded-md overflow-hidden my-4">
            <Image 
              src={`https://placehold.co/500x200.png`} 
              alt={`${policy.name} confirmation image`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={`${policy.dataAiHint} success`}
            />
             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <FileText className="h-16 w-16 text-white/80" />
             </div>
          </div>
          <p className="text-foreground">
            Your policy, <strong>{policy.name}</strong>, is now active.
            A confirmation email with your policy documents has been sent to your registered email address.
          </p>
          <p className="text-muted-foreground">
            Policy ID: <span className="font-mono bg-muted px-2 py-1 rounded">{`POL-${policy.id.toUpperCase()}-${new Date().getFullYear()}`}</span>
          </p>
          <Button
            onClick={() => alert("This is a mock download. In a real app, a PDF would be generated and downloaded.")}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Policy Document (PDF)
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/policies">Explore More Policies</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
