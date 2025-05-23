// Use server directive is required to use Genkit.
'use server';

/**
 * @fileOverview Summarizes insurance policies in plain language.
 *
 * - policySummary - A function that generates a summary of an insurance policy.
 * - PolicySummaryInput - The input type for the policySummary function.
 * - PolicySummaryOutput - The return type for the policySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PolicySummaryInputSchema = z.object({
  policyDetails: z
    .string()
    .describe('The detailed information about the insurance policy.'),
  userNeeds: z
    .string()
    .describe('The specific needs and concerns of the user.'),
});
export type PolicySummaryInput = z.infer<typeof PolicySummaryInputSchema>;

const PolicySummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A plain language summary of the insurance policy.'),
  suitability: z
    .string()
    .describe('An explanation of how well the policy fits the user needs.'),
});
export type PolicySummaryOutput = z.infer<typeof PolicySummaryOutputSchema>;

export async function policySummary(input: PolicySummaryInput): Promise<PolicySummaryOutput> {
  return policySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'policySummaryPrompt',
  input: {schema: PolicySummaryInputSchema},
  output: {schema: PolicySummaryOutputSchema},
  prompt: `You are an expert insurance advisor. Please summarize the following insurance policy in plain language, highlighting its key benefits and drawbacks, and explain how well it fits the user's specific needs.

Policy Details: {{{policyDetails}}}

User Needs: {{{userNeeds}}}

Provide a concise summary and a clear assessment of suitability.
`,
});

const policySummaryFlow = ai.defineFlow(
  {
    name: 'policySummaryFlow',
    inputSchema: PolicySummaryInputSchema,
    outputSchema: PolicySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
