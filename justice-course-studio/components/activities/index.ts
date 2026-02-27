import { ComponentType } from 'react';
import { ActivityType } from '@/types/course';
import { ActivityRendererProps } from './types';
import { ReadingActivity } from './ReadingActivity';
import { VideoActivity } from './VideoActivity';
import { TimelineActivity } from './TimelineActivity';
import { PrimarySourceActivity } from './PrimarySourceActivity';
import { ReflectionActivity } from './ReflectionActivity';
import { QuizActivity } from './QuizActivity';
import { SimulationCarpoolActivity } from './SimulationCarpoolActivity';

export const activityRegistry: Record<ActivityType, ComponentType<ActivityRendererProps>> = {
  reading: ReadingActivity,
  video: VideoActivity,
  timeline: TimelineActivity,
  primary_source: PrimarySourceActivity,
  reflection: ReflectionActivity,
  quiz: QuizActivity,
  simulation_carpool: SimulationCarpoolActivity
};
