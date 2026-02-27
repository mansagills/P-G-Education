import type { ActivityGeneratorInput, ActivityGeneratorOutput } from '@/types/ai';

export async function activityGenerator(input: ActivityGeneratorInput): Promise<ActivityGeneratorOutput> {
  return {
    activities: [
      {
        id: 'activity-1',
        type: 'debate',
        title: `${input.lessonTitle}: Structured Debate`,
        instructions: `Students debate claims tied to objective: ${input.objective}`
      },
      {
        id: 'activity-2',
        type: 'journal',
        title: `${input.lessonTitle}: Reflection Journal`,
        instructions: 'Write a reflection connecting primary sources to civic decision-making.'
      }
    ]
  };
}
