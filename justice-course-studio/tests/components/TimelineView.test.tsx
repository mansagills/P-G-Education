import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineView } from '@/components/timeline/TimelineView';

describe('TimelineView', () => {
  it('renders JSON-driven timeline events', () => {
    render(
      <TimelineView
        timeline={{
          id: 'timeline-1',
          title: 'Montgomery Milestones',
          events: [
            {
              id: 'e1',
              date: '1955-12-01',
              title: 'Rosa Parks Arrest',
              description: 'Trigger event.'
            }
          ]
        }}
      />
    );

    expect(screen.getByText('Montgomery Milestones')).toBeInTheDocument();
    expect(screen.getByText('Rosa Parks Arrest')).toBeInTheDocument();
  });
});
