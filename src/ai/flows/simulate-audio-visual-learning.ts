'use server';
/**
 * @fileOverview Simulate audio-visual learning experience for a given skill.
 *
 * - simulateAudioVisualLearning - A function that generates an audio narration script and visual explanation instructions for a skill.
 * - SimulateAudioVisualLearningInput - The input type for the simulateAudioVisualLearning function.
 * - SimulateAudioVisualLearningOutput - The return type for the simulateAudioVisualLearning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateAudioVisualLearningInputSchema = z.object({
  skill: z.string().describe('The skill to generate audio-visual learning content for.'),
});
export type SimulateAudioVisualLearningInput = z.infer<typeof SimulateAudioVisualLearningInputSchema>;

const SimulateAudioVisualLearningOutputSchema = z.object({
  audioNarrationScript: z.string().describe('A script for audio narration explaining the skill.'),
  visualExplanation: z.string().describe('Instructions for creating a visual explanation of the skill, such as diagrams or flowcharts.'),
});
export type SimulateAudioVisualLearningOutput = z.infer<typeof SimulateAudioVisualLearningOutputSchema>;

export async function simulateAudioVisualLearning(input: SimulateAudioVisualLearningInput): Promise<SimulateAudioVisualLearningOutput> {
  return simulateAudioVisualLearningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateAudioVisualLearningPrompt',
  input: {schema: SimulateAudioVisualLearningInputSchema},
  output: {schema: SimulateAudioVisualLearningOutputSchema},
  prompt: `You are an expert educator, skilled at creating engaging audio-visual learning experiences.

  For the given skill, generate an audio narration script and visual explanation instructions.

  Skill: {{{skill}}}

  # Audio Narration Script:
  - Create a short, conversational script as if explaining the skill verbally.
  - Use clear and simple language suitable for students.
  - Mark it clearly as \"Audio Narration Script\".

  # Visual Explanation Instructions:
  - Generate instructions for creating a visual explanation of the skill.
  - Suggest diagrams, flowcharts, or step-by-step visualizations.
  - Be specific about the content to include in the visuals.
  - Mark it clearly as \"Visual Explanation\".`,
});

const simulateAudioVisualLearningFlow = ai.defineFlow(
  {
    name: 'simulateAudioVisualLearningFlow',
    inputSchema: SimulateAudioVisualLearningInputSchema,
    outputSchema: SimulateAudioVisualLearningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
