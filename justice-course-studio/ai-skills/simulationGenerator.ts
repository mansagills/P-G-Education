import type { SimulationGeneratorInput, SimulationGeneratorOutput } from '@/types/ai';

export async function simulationGenerator(
  input: SimulationGeneratorInput
): Promise<SimulationGeneratorOutput> {
  return {
    simulation: {
      id: 'simulation-mvp-1',
      title: input.scenarioTitle,
      states: [
        { step: 1, prompt: `Context: ${input.context}` },
        { step: 2, prompt: 'Select a strategy and observe consequences.' }
      ]
    }
  };
}
