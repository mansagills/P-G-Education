import type { AssessmentBuilderInput, AssessmentBuilderOutput } from '@/types/ai';

export async function assessmentBuilder(
  input: AssessmentBuilderInput
): Promise<AssessmentBuilderOutput> {
  return {
    assessment: {
      id: 'assessment-mvp-1',
      title: `${input.lessonTitle} Checkpoint`,
      questions: [
        {
          id: 'q1',
          prompt: 'Which event most directly triggered the boycott?',
          type: 'multiple_choice',
          options: ['Court ruling', 'Arrest on a city bus', 'New city ordinance', 'Campaign speech']
        },
        {
          id: 'q2',
          prompt: `Explain how this lesson connects to ${input.standards.join(', ')}.`,
          type: 'short_answer'
        }
      ]
    }
  };
}
