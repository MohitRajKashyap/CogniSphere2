'use server';

/**
 * @fileOverview Generates skill explanations in text, code, and audio/visual modes.
 *
 * - generateSkillExplanations - A function that generates explanations for a given skill.
 * - GenerateSkillExplanationsInput - The input type for the generateSkillExplanations function.
 * - GenerateSkillExplanationsOutput - The return type for the generateSkillExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSkillExplanationsInputSchema = z.object({
  skill: z.string().describe('The skill to generate explanations for.'),
});
export type GenerateSkillExplanationsInput = z.infer<
  typeof GenerateSkillExplanationsInputSchema
>;

const GenerateSkillExplanationsOutputSchema = z.object({
  textMode: z.object({
    explanation: z.string().describe('A simple explanation of the skill.'),
    keyConcepts: z.string().describe('Key concepts related to the skill.'),
  }),
  codeMode: z.object({
    codeExamples: z
      .string()
      .describe('Real, runnable code examples with comments.'),
    miniTask: z.string().describe('A mini practice task for the skill.'),
  }),
  audioVisualMode: z.object({
    audioNarrationScript: z
      .string()
      .describe('A short voice-style script explaining the skill.'),
    visualExplanation: z
      .string()
      .describe('Visual explanation instructions for the skill.'),
  }),
});
export type GenerateSkillExplanationsOutput = z.infer<
  typeof GenerateSkillExplanationsOutputSchema
>;

export async function generateSkillExplanations(
  input: GenerateSkillExplanationsInput
): Promise<GenerateSkillExplanationsOutput> {
  return generateSkillExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillExplanationsPrompt',
  input: {schema: GenerateSkillExplanationsInputSchema},
  output: {schema: GenerateSkillExplanationsOutputSchema},
  prompt: `You are an expert educator creating learning materials for students.

  For the given skill, generate the following:

  TEXT MODE:
  - A simple, beginner-friendly explanation of the skill.
  - Key concepts related to the skill.

  CODE MODE:
  - Real, runnable code examples (Python or relevant language) with comments explaining each step.
  - A mini practice task for the student.

  AUDIO + VISUAL MODE (SIMULATED):
  - Audio Narration Script: A short voice-style script as if explaining the skill verbally.
  - Visual Explanation: Instructions for creating visual explanations, including diagrams, flowcharts, and step-by-step visualizations.

  Skill: {{{skill}}}

  Format the output as a JSON object with the following structure:
  {
    "textMode": {
      "explanation": "...",
      "keyConcepts": "..."
    },
    "codeMode": {
      "codeExamples": "...",
      "miniTask": "..."
    },
    "audioVisualMode": {
      "audioNarrationScript": "...",
      "visualExplanation": "..."
    }
  }`,
});

const generateSkillExplanationsFlow = ai.defineFlow(
  {
    name: 'generateSkillExplanationsFlow',
    inputSchema: GenerateSkillExplanationsInputSchema,
    outputSchema: GenerateSkillExplanationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
