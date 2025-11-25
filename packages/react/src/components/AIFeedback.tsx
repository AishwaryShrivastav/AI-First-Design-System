import { createReactComponent } from '../create-react-component';

export interface AIFeedbackProps {
  simple?: boolean;
  detailed?: boolean;
  inline?: boolean;
  onFeedback?: (e: CustomEvent<{ type: 'positive' | 'negative'; comment: string; timestamp: string }>) => void;
}

export const AIFeedback = createReactComponent<HTMLElement, AIFeedbackProps>(
  'ai-feedback',
  ['simple', 'detailed', 'inline']
);

