'use server';

import { policyRecommendation, type PolicyRecommendationInput, type PolicyRecommendationOutput } from '@/ai/flows/policy-recommendation';
import { z } from 'zod';

const RiskToleranceEnum = z.enum(['Low', 'Medium', 'High']);

const PolicyRecommendationServerInputSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18.").max(100, "Age must be at most 100."),
  coverageNeeds: z.string().min(10, "Please describe your coverage needs in more detail.").max(500, "Coverage needs description is too long."),
  personalInformation: z.string().min(10, "Please provide some personal information.").max(500, "Personal information is too long."),
  riskTolerance: RiskToleranceEnum,
});


export interface FormState {
  message: string;
  recommendations?: string;
  fields?: Record<string, string>;
  issues?: string[];
}


export async function getPolicyRecommendationsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const rawFormData = {
    age: formData.get('age'),
    coverageNeeds: formData.get('coverageNeeds'),
    personalInformation: formData.get('personalInformation'),
    riskTolerance: formData.get('riskTolerance'),
  };

  const validatedFields = PolicyRecommendationServerInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Form validation failed.",
      issues: validatedFields.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`),
    };
  }
  
  const input: PolicyRecommendationInput = validatedFields.data;

  try {
    const result: PolicyRecommendationOutput = await policyRecommendation(input);
    if (result.policyRecommendations) {
      return { message: "Recommendations generated successfully.", recommendations: result.policyRecommendations };
    } else {
      return { message: "Could not generate recommendations at this time. AI did not return data." };
    }
  } catch (error) {
    console.error("Error getting policy recommendations:", error);
    return { message: "An unexpected error occurred while generating recommendations. Please try again later." };
  }
}
