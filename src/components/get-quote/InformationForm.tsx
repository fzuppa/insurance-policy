"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getPolicyRecommendationsAction, FormState } from "@/app/get-quote/actions";
import RecommendationDisplay from "./RecommendationDisplay";
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';


const formSchema = z.object({
  age: z.coerce.number().min(18, "Must be at least 18.").max(100, "Must be 100 or younger."),
  coverageNeeds: z.string().min(10, "Minimum 10 characters.").max(500, "Maximum 500 characters."),
  personalInformation: z.string().min(10, "Minimum 10 characters.").max(500, "Maximum 500 characters."),
  riskTolerance: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select your risk tolerance.",
  }),
});

export type InformationFormValues = z.infer<typeof formSchema>;

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Get Recommendations
    </Button>
  );
}

export default function InformationForm() {
  const [state, formAction] = useFormState(getPolicyRecommendationsAction, initialState);
  const { toast } = useToast();

  const form = useForm<InformationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      coverageNeeds: "",
      personalInformation: "",
      riskTolerance: undefined,
    },
    mode: "onChange", // Validate on change for better UX
  });

  useEffect(() => {
    if (state.message && state.message !== "Form validation failed." && state.message !== "Recommendations generated successfully.") {
      toast({
        title: state.issues ? "Validation Error" : "Server Message",
        description: state.message + (state.issues ? `\n${state.issues.join('\n')}` : ''),
        variant: state.issues || state.message.includes("error") || state.message.includes("Could not") ? "destructive" : "default",
      });
    }
    if (state.message === "Recommendations generated successfully." && state.recommendations) {
       toast({
        title: "Success!",
        description: "Policy recommendations generated below.",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Tell Us About Yourself</CardTitle>
        <CardDescription>
          Provide some details so our AI can suggest the best policies for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 35" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverageNeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coverage Needs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you're looking to cover (e.g., health expenses, family financial security, car protection, home safety)."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be as specific as possible for better recommendations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Information / Situation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe your situation (e.g., single, married with children, homeowner, specific health conditions, type of car)."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This helps us understand your context. Do not share sensitive private data.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riskTolerance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Tolerance</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your risk tolerance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low (Prefer lower premiums, higher deductibles)</SelectItem>
                      <SelectItem value="Medium">Medium (Balanced premiums and coverage)</SelectItem>
                      <SelectItem value="High">High (Prefer comprehensive coverage, lower deductibles)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How comfortable are you with potential out-of-pocket expenses?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <SubmitButton />
          </form>
        </Form>
        
        {state.recommendations && (
          <RecommendationDisplay recommendations={state.recommendations} />
        )}
      </CardContent>
    </Card>
  );
}
