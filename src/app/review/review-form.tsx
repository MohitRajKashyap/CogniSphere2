"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { evaluateSessionAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SKILLS } from "@/lib/constants";
import { AlertCircle, CheckCircle, Lightbulb, Loader, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Evaluating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Feedback
        </>
      )}
    </Button>
  );
}

function ReviewFormContent({ state }: { state: any }) {
    const { pending } = useFormStatus();
    const { toast } = useToast();

    useEffect(() => {
        if (state.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.error,
        });
        }
    }, [state.error, toast]);

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Submit Your Session Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="skill-select" className="text-sm font-medium">What skill did you practice?</label>
                            <Select name="skill" required>
                            <SelectTrigger id="skill-select" className="mt-1">
                                <SelectValue placeholder="Select a skill..." />
                            </SelectTrigger>
                            <SelectContent>
                                {SKILLS.map((skill) => (
                                <SelectItem key={skill.name} value={skill.name}>
                                    <div className="flex items-center gap-2">
                                    <skill.icon className="h-4 w-4" />
                                    {skill.name}
                                    </div>
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label htmlFor="summary" className="text-sm font-medium">Summarize what you learned or taught</label>
                            <Textarea
                            id="summary"
                            name="summary"
                            placeholder="e.g., 'I learned about Python lists and how to use comprehensions to make my code more concise...'"
                            required
                            className="mt-1 min-h-[150px]"
                            />
                        </div>
                        
                        <SubmitButton />
                        {state.error && !state.data && (
                            <p className="text-sm text-destructive pt-2">{state.error}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
            
            <div>
                {pending ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Evaluating Your Summary...</CardTitle>
                            <CardDescription>Our AI is analyzing your input.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-48">
                            <Loader className="h-12 w-12 animate-spin text-primary" />
                        </CardContent>
                    </Card>
                ) : state.data ? (
                <Card className="bg-gradient-to-br from-card to-secondary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />AI Evaluation Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-lg font-semibold">Understanding Score</h3>
                            <span className="text-2xl font-bold text-primary">{state.data.score}/10</span>
                        </div>
                        <Progress value={state.data.score * 10} className="h-3" />
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" />Feedback</h3>
                        <p className="text-muted-foreground">{state.data.feedback}</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="h-5 w-5 text-yellow-400" />Improvement Tips</h3>
                        <p className="text-muted-foreground">{state.data.improvementTips}</p>
                    </div>
                    </CardContent>
                </Card>
                ) : state.error ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Evaluation Failed</AlertTitle>
                        <AlertDescription>
                            The AI could not process your summary. Please check your input and try again.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Card className="flex items-center justify-center h-full border-dashed">
                        <div className="text-center text-muted-foreground p-8">
                            <Sparkles className="mx-auto h-12 w-12 mb-4"/>
                            <h3 className="text-lg font-semibold text-foreground">Awaiting Submission</h3>
                            <p>Your AI feedback will appear here once you submit a summary.</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}

export function ReviewForm() {
  const initialState = { data: null, error: null, message: "" };
  const [state, formAction] = useFormState(evaluateSessionAction, initialState);

  return (
    <form action={formAction}>
      <ReviewFormContent state={state} />
    </form>
  );
}
