"use server";

import { generateSkillExplanations, GenerateSkillExplanationsOutput } from "@/ai/flows/generate-skill-explanations";
import { evaluateSessionUnderstanding, EvaluateSessionUnderstandingOutput } from "@/ai/flows/evaluate-session-understanding";
import { z } from "zod";

const explanationSchema = z.object({
  skill: z.string().min(1, "Please select a skill."),
});

type ExplanationState = {
  data: GenerateSkillExplanationsOutput | null;
  error: string | null;
  message: string;
};

export async function generateExplanationsAction(
  prevState: ExplanationState,
  formData: FormData
): Promise<ExplanationState> {
  const validatedFields = explanationSchema.safeParse({
    skill: formData.get("skill"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.skill?.[0] || 'Validation failed',
      message: 'Invalid input.',
    };
  }

  try {
    const output = await generateSkillExplanations({ skill: validatedFields.data.skill });
    return { data: output, error: null, message: 'Success' };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to generate explanation: ${errorMessage}`, message: 'AI generation failed.' };
  }
}

const evaluationSchema = z.object({
  skill: z.string().min(1, "Please select a skill."),
  summary: z.string().min(10, "Summary must be at least 10 characters long."),
});

type EvaluationState = {
  data: EvaluateSessionUnderstandingOutput | null;
  error: string | null;
  message: string;
};

export async function evaluateSessionAction(
  prevState: EvaluationState,
  formData: FormData
): Promise<EvaluationState> {
  const validatedFields = evaluationSchema.safeParse({
    skill: formData.get("skill"),
    summary: formData.get("summary"),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      data: null,
      error: errors.skill?.[0] || errors.summary?.[0] || 'Validation failed',
      message: 'Invalid input.',
    };
  }
  
  try {
    const output = await evaluateSessionUnderstanding({ 
      skillName: validatedFields.data.skill,
      sessionSummary: validatedFields.data.summary,
    });
    return { data: output, error: null, message: 'Success' };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to get evaluation: ${errorMessage}`, message: 'AI evaluation failed.' };
  }
}
