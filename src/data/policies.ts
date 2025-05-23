import type { Policy } from '@/types';
import { HeartPulse, UserCheck, Car, Home as HomeIcon } from 'lucide-react';

export const policies: Policy[] = [
  {
    id: 'health-starter',
    name: 'Health Starter Plan',
    type: 'Health',
    description: 'Basic health coverage for individuals and families, covering essential medical expenses and preventative care.',
    pricePerMonth: 75,
    coverageDetails: ['Hospitalization up to $50,000/year', 'Essential Doctor Visits', 'Generic Prescription Drugs', 'Annual Check-ups'],
    Icon: HeartPulse,
    dataAiHint: 'medical health',
  },
  {
    id: 'life-secure',
    name: 'Life Secure Plan',
    type: 'Life',
    description: 'Comprehensive term life insurance to protect your loved ones financial future in case of unforeseen events.',
    pricePerMonth: 50,
    coverageDetails: ['Death Benefit up to $250,000', 'Terminal Illness Rider Included', 'Accidental Death & Dismemberment Benefit'],
    Icon: UserCheck,
    dataAiHint: 'family protection',
  },
  {
    id: 'auto-shield',
    name: 'AutoShield Comprehensive',
    type: 'Auto',
    description: 'Full coverage auto insurance including collision, liability, and protection against theft or natural disasters.',
    pricePerMonth: 120,
    coverageDetails: ['Collision Coverage ($500 Deductible)', 'Liability (100k/300k/50k)', 'Comprehensive (Theft, Vandalism, Weather)', 'Roadside Assistance'],
    Icon: Car,
    dataAiHint: 'vehicle safety',
  },
  {
    id: 'home-guardian',
    name: 'Home Guardian Policy',
    type: 'Home',
    description: 'Protect your home and personal belongings against damage, theft, and common natural disasters.',
    pricePerMonth: 90,
    coverageDetails: ['Dwelling Coverage up to $300,000', 'Personal Property Protection', 'Liability Coverage ($100,000)', 'Additional Living Expenses'],
    Icon: HomeIcon,
    dataAiHint: 'house property',
  },
  {
    id: 'health-premium',
    name: 'Health Premium Plus',
    type: 'Health',
    description: 'Extensive health coverage with lower deductibles, wider network access, and additional wellness benefits.',
    pricePerMonth: 150,
    coverageDetails: ['Full Hospitalization Coverage', 'Specialist & Emergency Visits', 'Branded & Generic Prescription Drugs', 'Dental & Vision Rider Available', 'Wellness Programs'],
    Icon: HeartPulse,
    dataAiHint: 'healthcare wellness',
  },
  {
    id: 'life-legacy',
    name: 'Life Legacy Builder',
    type: 'Life',
    description: 'A whole life policy that not only provides a death benefit but also builds cash value over time, ensuring a lasting financial legacy.',
    pricePerMonth: 100,
    coverageDetails: ['Guaranteed Death Benefit for Life', 'Cash Value Accumulation (Tax-deferred)', 'Policy Loan Options', 'Flexible Premium Payments'],
    Icon: UserCheck,
    dataAiHint: 'estate planning',
  }
];

export const getPolicyById = (id: string): Policy | undefined => {
  return policies.find(policy => policy.id === id);
};
