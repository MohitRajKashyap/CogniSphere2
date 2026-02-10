"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { generateExplanationsAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SKILLS } from "@/lib/constants";
import { Book, Code, Bot, AlertCircle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Learning Module"
      )}
    </Button>
  );
}

const LoadingSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="pt-4 space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-20 w-full" />
        </div>
    </div>
)

function LearningModuleContent({ state }: { state: any }) {
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
    <>
      <div className="p-4 border rounded-lg bg-card space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="skill-select" className="text-sm font-medium">Skill to Learn</label>
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
          <div className="self-end">
             <SubmitButton />
          </div>
        </div>
        {state.error && !state.data && (
            <p className="text-sm text-destructive">{state.error}</p>
        )}
      </div>

      {(pending || state.data) && (
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text"><Book className="mr-2 h-4 w-4" />Text Mode</TabsTrigger>
            <TabsTrigger value="code"><Code className="mr-2 h-4 w-4" />Code Mode</TabsTrigger>
            <TabsTrigger value="av"><Bot className="mr-2 h-4 w-4" />A/V Mode</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text">
            <Card>
              <CardHeader>
                <CardTitle>Text-Based Explanation</CardTitle>
                <CardDescription>A simple, beginner-friendly breakdown of the skill.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 prose prose-invert max-w-none">
                {pending ? <LoadingSkeleton /> : state.data && (
                  <>
                    <h3 className="font-semibold">Explanation</h3>
                    <p>{state.data.textMode.explanation}</p>
                    <h3 className="font-semibold pt-4">Key Concepts</h3>
                    <p>{state.data.textMode.keyConcepts}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples & Practice</CardTitle>
                <CardDescription>Runnable code examples with explanations and a mini practice task.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 prose prose-invert max-w-none">
                 {pending ? <LoadingSkeleton /> : state.data && (
                  <>
                    <h3 className="font-semibold">Code Examples</h3>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto"><code className="font-code">{state.data.codeMode.codeExamples}</code></pre>
                    <h3 className="font-semibold pt-4">Mini Task</h3>
                    <p>{state.data.codeMode.miniTask}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="av">
            <Card>
              <CardHeader>
                <CardTitle>Simulated Audio/Visual Mode</CardTitle>
                <CardDescription>A script for audio narration and instructions for visual aids.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 prose prose-invert max-w-none">
                 {pending ? <LoadingSkeleton /> : state.data && (
                  <>
                    <div>
                      <h3 className="font-semibold">Audio Narration Script</h3>
                      <blockquote className="border-l-4 pl-4 italic">{state.data.audioVisualMode.audioNarrationScript}</blockquote>
                    </div>
                    <div>
                      <h3 className="font-semibold">Visual Explanation Guide</h3>
                      <p>{state.data.audioVisualMode.visualExplanation}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </card>
          </TabsContent>
        </Tabs>
      )}

      {state.error && !pending && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Generation Failed</AlertTitle>
          <AlertDescription>
            The AI failed to generate the learning module. Please try again or select a different skill.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

export function LearningModule() {
  const initialState = { data: null, error: null, message: "" };
  const [state, formAction] = useFormState(generateExplanationsAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <LearningModuleContent state={state} />
    </form>
  );
}
