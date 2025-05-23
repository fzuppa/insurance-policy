import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface RecommendationDisplayProps {
  recommendations: string;
}

export default function RecommendationDisplay({ recommendations }: RecommendationDisplayProps) {
  return (
    <Card className="mt-8 border-accent shadow-md">
      <CardHeader className="flex flex-row items-center space-x-3">
        <Lightbulb className="h-8 w-8 text-accent" />
        <CardTitle className="text-xl text-accent" id="recommendationTitle">Recomendaciones de Pólizas</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground whitespace-pre-wrap">
          {recommendations}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          <strong>Note:</strong> These are AI-generated suggestions. Please review policy details carefully or consult with an advisor before making a decision. You can find specific policy details on our <a href="/policies" className="underline text-primary hover:text-primary/80">Policies page</a>.
        </p>
      </CardContent>
    </Card>
  );
}
