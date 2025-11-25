import { createReactComponent } from '../create-react-component';

export interface AISkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'custom';
  width?: string;
  height?: string;
  animated?: boolean;
  lines?: number;
}

export const AISkeleton = createReactComponent<HTMLElement, AISkeletonProps>(
  'ai-skeleton',
  ['variant', 'width', 'height', 'animated', 'lines']
);

