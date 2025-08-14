'use server';

/**
 * @fileOverview An AI agent that assigns an Indonesian ghost name and description based on the user's name.
 *
 * - assignGhost - A function that handles the ghost assignment process.
 * - AssignGhostInput - The input type for the assignGhost function.
 * - AssignGhostOutput - The return type for the assignGhost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssignGhostInputSchema = z.object({
  name: z.string().describe('The user\u2019s name.'),
});
export type AssignGhostInput = z.infer<typeof AssignGhostInputSchema>;

const AssignGhostOutputSchema = z.object({
  ghostName: z.string().describe('The generated Indonesian ghost name.'),
  description: z.string().describe('A short description in Indonesian Language of the ghost and its relevance to the user\u2019s name.'),
});
export type AssignGhostOutput = z.infer<typeof AssignGhostOutputSchema>;

export async function assignGhost(input: AssignGhostInput): Promise<AssignGhostOutput> {
  return assignGhostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assignGhostPrompt',
  input: {schema: AssignGhostInputSchema},
  output: {schema: AssignGhostOutputSchema},
  prompt: `You are an expert in Indonesian folklore and mythology, specializing in ghosts.

  A user has provided their name.  Your task is to find a relevant Indonesian ghost name and provide a short description of the ghost, as well as why that ghost was assigned to the user based on their name.

  User's Name: {{{name}}}
  `,
});

const assignGhostFlow = ai.defineFlow(
  {
    name: 'assignGhostFlow',
    inputSchema: AssignGhostInputSchema,
    outputSchema: AssignGhostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
