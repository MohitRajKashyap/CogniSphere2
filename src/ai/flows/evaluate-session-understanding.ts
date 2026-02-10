'use server';

/**
 * @fileOverview This file defines a Genkit flow for evaluating a user's understanding of a learning session.
 *
 * It includes:
 * - evaluateSessionUnderstanding: The main function to trigger the evaluation flow.
 * - EvaluateSessionUnderstandingInput: The input type for the evaluation, including the session summary.
 * - EvaluateSessionUnderstandingOutput: The output type, containing the score, feedback, and improvement tips.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateSessionUnderstandingInputSchema = z.object({
  sessionSummary: z.string().describe('A summary of the learning session provided by the student.'),
  skillName: z.string().describe('The name of the skill that was learned.'),
});
export type EvaluateSessionUnderstandingInput = z.infer<typeof EvaluateSessionUnderstandingInputSchema>;

const EvaluateSessionUnderstandingOutputSchema = z.object({
  score: z.number().describe('A score between 1 and 10 representing the student\'s understanding.'),
  feedback: z.string().describe('Feedback on the student\'s understanding of the material.'),
  improvementTips: z.string().describe('Specific tips for the student to improve their understanding.'),
});
export type EvaluateSessionUnderstandingOutput = z.infer<typeof EvaluateSessionUnderstandingOutputSchema>;

export async function evaluateSessionUnderstanding(input: EvaluateSessionUnderstandingInput): Promise<EvaluateSessionUnderstandingOutput> {
  return evaluateSessionUnderstandingFlow(input);
}

const evaluateSessionUnderstandingPrompt = ai.definePrompt({
  name: 'evaluateSessionUnderstandingPrompt',
  input: {schema: EvaluateSessionUnderstandingInputSchema},
  output: {schema: EvaluateSessionUnderstandingOutputSchema},
  prompt: `You are an expert educator evaluating a student's understanding of a skill based on their session summary.

  Skill Name: {{{skillName}}}
  Session Summary: {{{sessionSummary}}}

  Provide a score (1-10), feedback, and improvement tips based on the summary. Be encouraging and helpful.

  Ensure the score is a single number, and the feedback and improvement tips are concise and actionable.
  `,
});

const evaluateSessionUnderstandingFlow = ai.defineFlow(
  {
    name: 'evaluateSessionUnderstandingFlow',
    inputSchema: EvaluateSessionUnderstandingInputSchema,
    outputSchema: EvaluateSessionUnderstandingOutputSchema,
  },
  async input => {
    const {output} = await evaluateSessionUnderstandingPrompt(input);
    return output!;
  }
);
