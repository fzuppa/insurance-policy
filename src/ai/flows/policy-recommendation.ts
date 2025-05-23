//PolicyPilot - Policy Recommendation Engine

'use server';

/**
 * @fileOverview AI-powered recommendation tool that suggests suitable policies based on user input.
 *
 * - policyRecommendation - A function that handles the policy recommendation process.
 * - PolicyRecommendationInput - The input type for the policyRecommendation function.
 * - PolicyRecommendationOutput - The return type for the policyRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PolicyRecommendationInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  coverageNeeds: z.string().describe('The coverage needs of the user.'),
  personalInformation: z.string().describe('The personal information of the user.'),
  riskTolerance: z.string().describe('The risk tolerance of the user.'),
});
export type PolicyRecommendationInput = z.infer<typeof PolicyRecommendationInputSchema>;

const PolicyRecommendationOutputSchema = z.object({
  policyRecommendations: z.string().describe('The policy recommendations for the user.'),
});
export type PolicyRecommendationOutput = z.infer<typeof PolicyRecommendationOutputSchema>;

export async function policyRecommendation(input: PolicyRecommendationInput): Promise<PolicyRecommendationOutput> {
  return policyRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'policyRecommendationPrompt',
  input: {schema: PolicyRecommendationInputSchema},
  output: {schema: PolicyRecommendationOutputSchema},
  prompt: `You are an AI-powered policy recommendation tool. You will provide policy recommendations based on the user's provided information and coverage needs.

  Consider the following information about the user when recommending policies:
  Age: {{{age}}}
  Coverage Needs: {{{coverageNeeds}}}
  Personal Information: {{{personalInformation}}}
  Risk Tolerance: {{{riskTolerance}}}
  \n
  Based on the information above, provide policy recommendations for the user. Consider policies that would be most suitable for their specific situation.
  `,
});

const policyRecommendationFlow = ai.defineFlow(
  {
    name: 'policyRecommendationFlow',
    inputSchema: PolicyRecommendationInputSchema,
    outputSchema: PolicyRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
