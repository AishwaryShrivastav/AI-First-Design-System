import { createReactComponent } from '../create-react-component';
import type { Confidence } from '@ai-first-ds/core';

export interface AIBadgeProps {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'ai';
  aiIndicator?: boolean;
  confidence?: Confidence;
  dot?: boolean;
}

export const AIBadge = createReactComponent<HTMLElement, AIBadgeProps>('ai-badge', [
  'variant',
  'aiIndicator',
  'confidence',
  'dot',
]);
