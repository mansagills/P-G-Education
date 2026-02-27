import type { TimelineEvent } from './domain';

export interface AssetStructurerInput {
  courseTitle: string;
  assetSummaries: Array<{
    id: string;
    assetType: string;
    extractedText: string;
  }>;
}

export interface AssetStructurerOutput {
  modules: Array<{
    id: string;
    title: string;
    summary: string;
    lessonCount: number;
  }>;
  recommendations: string[];
}

export interface TimelineGeneratorInput {
  lessonTitle: string;
  sourceText: string;
  requiredDates?: string[];
}

export interface TimelineGeneratorOutput {
  timelineId: string;
  title: string;
  events: TimelineEvent[];
}

export interface PrimarySourceAnalyzerInput {
  sourceTitle: string;
  sourceText: string;
}

export interface PrimarySourceAnalyzerOutput {
  keyThemes: string[];
  people: string[];
  dates: string[];
  annotationPrompts: string[];
}

export interface ActivityGeneratorInput {
  lessonTitle: string;
  objective: string;
}

export interface ActivityGeneratorOutput {
  activities: Array<{
    id: string;
    type: string;
    title: string;
    instructions: string;
  }>;
}

export interface SimulationGeneratorInput {
  scenarioTitle: string;
  context: string;
}

export interface SimulationGeneratorOutput {
  simulation: {
    id: string;
    title: string;
    states: Array<Record<string, unknown>>;
  };
}

export interface AssessmentBuilderInput {
  lessonTitle: string;
  standards: string[];
}

export interface AssessmentBuilderOutput {
  assessment: {
    id: string;
    title: string;
    questions: Array<{
      id: string;
      prompt: string;
      type: 'multiple_choice' | 'short_answer';
      options?: string[];
    }>;
  };
}

export interface VideoScriptGeneratorInput {
  moduleTitle: string;
  targetDurationMinutes: number;
}

export interface VideoScriptGeneratorOutput {
  script: {
    title: string;
    scenes: Array<{
      sceneNumber: number;
      narration: string;
      visualCue: string;
    }>;
  };
}
