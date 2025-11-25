import { createReactComponent } from '../create-react-component';

export interface AILabelProps {
  interactive?: boolean;
  model?: string;
  animated?: boolean;
  onClick?: (e: CustomEvent<{ model: string }>) => void;
}

export const AILabel = createReactComponent<HTMLElement, AILabelProps>(
  'ai-label',
  ['interactive', 'model', 'animated']
);

