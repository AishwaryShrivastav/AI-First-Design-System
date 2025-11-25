import { createReactComponent } from '../create-react-component';

export interface AIStreamingTextProps {
  text?: string;
  streaming?: boolean;
  speed?: number;
  showCursor?: boolean;
  onStreamComplete?: (e: CustomEvent<{ text: string }>) => void;
  onStreamError?: (e: CustomEvent) => void;
}

export const AIStreamingText = createReactComponent<HTMLElement, AIStreamingTextProps>(
  'ai-streaming-text',
  ['text', 'streaming', 'speed', 'showCursor']
);

