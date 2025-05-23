import type { Policy } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface PolicyCardProps {
  policy: Policy;
}

export default function PolicyCard({ policy }: PolicyCardProps) {
  const { Icon } = policy;
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="relative w-full h-48 bg-secondary">
        <Image 
          src={`https://placehold.co/600x400.png`} 
          alt={`${policy.name} placeholder image`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={policy.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4 p-2 bg-background/80 rounded-full shadow-md">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{policy.name}</CardTitle>
        <CardDescription className="text-sm h-16 overflow-hidden">{policy.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="font-semibold mb-2 text-foreground">Key Coverage:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {policy.coverageDetails.slice(0, 3).map((detail, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
          {policy.coverageDetails.length > 3 && (
             <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span>And more...</span>
            </li>
          )}
        </ul>
        <p className="text-3xl font-bold mt-4 text-accent">
          ${policy.pricePerMonth}
          <span className="text-sm font-normal text-muted-foreground">/month</span>
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/checkout/${policy.id}`}>Choose Plan</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
