
'use server';

import { assignGhost, AssignGhostOutput } from '@/ai/flows/assign-ghost';

export async function getGhostForName(
  name: string
): Promise<{ result?: AssignGhostOutput; error?: string }> {
  if (!name || name.trim().length < 2) {
    return { error: 'Please enter a name with at least 2 characters.' };
  }
  try {
    const result = await assignGhost({ name });
    return { result };
  } catch (e) {
    console.error(e);
    return { error: 'An unknown error occurred. Please try again later.' };
  }
}
