import { createReactComponent } from '../create-react-component';
import type { ExplainabilityLevel } from '@ai-first-ds/core';

export interface AIExplainabilityPanelProps {
  level?: ExplainabilityLevel;
  collapsible?: boolean;
  collapsed?: boolean;
  onLevelChange?: (e: CustomEvent<{ level: ExplainabilityLevel }>) => void;
}

export const AIExplainabilityPanel = createReactComponent<HTMLElement, AIExplainabilityPanelProps>(
  'ai-explainability-panel',
  ['level', 'collapsible', 'collapsed']
);
