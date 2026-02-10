'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate code examples for a given skill.
 *
 * The flow takes a skill name as input and returns a structured JSON containing real,
 * runnable code examples with comments explaining each step, and a mini practice task.
 *
 * @interface GenerateCodeExamplesInput - The input type for the generateCodeExamples function.
 * @interface GenerateCodeExamplesOutput - The output type for the generateCodeExamples function.
 * @function generateCodeExamples - A function that generates code examples for a given skill.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeExamplesInputSchema = z.object({
  skill: z.string().describe('The skill to generate code examples for (e.g., Python, UI/UX).'),
});

export type GenerateCodeExamplesInput = z.infer<typeof GenerateCodeExamplesInputSchema>;

const GenerateCodeExamplesOutputSchema = z.object({
  codeExamples: z.array(
    z.object({
      title: z.string().describe('Title of the code example.'),
      code: z.string().describe('Runnable code example.'),
      explanation: z.string().describe('Explanation of the code.'),
      practiceTask: z.string().describe('A mini practice task for the user.'),
    })
  ).describe('Array of code examples for the specified skill.'),
});

export type GenerateCodeExamplesOutput = z.infer<typeof GenerateCodeExamplesOutputSchema>;

export async function generateCodeExamples(input: GenerateCodeExamplesInput): Promise<GenerateCodeExamplesOutput> {
  return generateCodeExamplesFlow(input);
}

const generateCodeExamplesPrompt = ai.definePrompt({
  name: 'generateCodeExamplesPrompt',
  input: {schema: GenerateCodeExamplesInputSchema},
  output: {schema: GenerateCodeExamplesOutputSchema},
  prompt: `You are an expert coding tutor. Generate real, runnable code examples with comments explaining each step, and a mini practice task for the user to learn the skill.

  Skill: {{{skill}}}

  Format the output as a JSON array of code examples, each with a title, code, explanation, and practiceTask.
  `,
});

const generateCodeExamplesFlow = ai.defineFlow(
  {
    name: 'generateCodeExamplesFlow',
    inputSchema: GenerateCodeExamplesInputSchema,
    outputSchema: GenerateCodeExamplesOutputSchema,
  },
  async input => {
    const {output} = await generateCodeExamplesPrompt(input);
    return output!;
  }
);
