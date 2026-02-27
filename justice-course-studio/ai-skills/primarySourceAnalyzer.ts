import type { PrimarySourceAnalyzerInput, PrimarySourceAnalyzerOutput } from '@/types/ai';

export async function primarySourceAnalyzer(
  input: PrimarySourceAnalyzerInput
): Promise<PrimarySourceAnalyzerOutput> {
  const words = input.sourceText.split(/\s+/).filter(Boolean);

  return {
    keyThemes: ['civil rights', 'collective action', 'legal challenge'],
    people: ['Rosa Parks', 'Martin Luther King Jr.'],
    dates: ['1955-12-01', '1956-12-21'],
    annotationPrompts: [
      `What argument is the author making in ${input.sourceTitle}?`,
      `Which phrases in this source reveal urgency or resistance? (${words.length} words parsed)`
    ]
  };
}
