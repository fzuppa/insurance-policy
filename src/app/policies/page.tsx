import PolicyCard from '@/components/policies/PolicyCard';
import { policies } from '@/data/policies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Policies | PolicyPilot',
  description: 'Browse our wide range of insurance policies tailored to your needs.',
};

export default function PoliciesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Our Insurance Policies</h1>
        <p className="text-lg text-foreground max-w-xl mx-auto">
          Find the perfect coverage from our diverse range of policies. Secure your future today.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
}
