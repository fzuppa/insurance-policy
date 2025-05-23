import InformationForm from '@/components/get-quote/InformationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Quote | PolicyPilot',
  description: 'Provide your information to get personalized AI-powered policy recommendations.',
};

export default function GetQuotePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Get Your Personalized Quote</h1>
        <p className="text-lg text-foreground max-w-xl mx-auto">
          Answer a few questions, and our AI will help find the best insurance policies for your needs.
        </p>
      </section>
      
      <InformationForm />
    </div>
  );
}
