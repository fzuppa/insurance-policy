"use client";

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
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import type { Policy } from "@/types";
import { CreditCard, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const paymentFormSchema = z.object({
  cardName: z.string().min(2, "Name on card is too short.").max(50, "Name on card is too long."),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format."),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits."),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  policy: Policy;
}

export default function PaymentForm({ policy }: PaymentFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(values: PaymentFormValues) {
    // This is a mock submission. In a real app, integrate with a payment gateway.
    console.log("Payment details (mock):", values);
    toast({
      title: "Payment Processing (Mock)",
      description: "Your payment is being processed...",
    });
    // Simulate payment processing delay
    setTimeout(() => {
      router.push(`/confirmation/${policy.id}`);
    }, 2000);
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          <CreditCard className="h-7 w-7"/> Secure Payment
        </CardTitle>
        <CardDescription>
          You are purchasing: <strong>{policy.name}</strong> for ${policy.pricePerMonth}/month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John M. Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="•••• •••• •••• ••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="•••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Lock className="mr-2 h-4 w-4" /> Pay ${policy.pricePerMonth}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">
          All transactions are secure and encrypted. This is a demo payment form.
        </p>
      </CardFooter>
    </Card>
  );
}
