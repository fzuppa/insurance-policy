import type { LucideIcon } from 'lucide-react';

export interface Policy {
  id: string;
  name: string;
  type: 'Health' | 'Life' | 'Auto' | 'Home';
  description: string;
  pricePerMonth: number;
  coverageDetails: string[];
  Icon: LucideIcon;
  dataAiHint: string; // For placeholder image hints
}
