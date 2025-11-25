import { createReactComponent } from '../create-react-component';

export interface AIPromptInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  showTokenCount?: boolean;
  maxTokens?: number;
  multiline?: boolean;
  showTemplates?: boolean;
  onSubmit?: (e: CustomEvent<{ value: string }>) => void;
  onChange?: (e: CustomEvent<{ value: string }>) => void;
  onTemplateSelect?: (e: CustomEvent<{ template: string }>) => void;
}

export const AIPromptInput = createReactComponent<HTMLElement, AIPromptInputProps>(
  'ai-prompt-input',
  [
    'value',
    'placeholder',
    'disabled',
    'loading',
    'showTokenCount',
    'maxTokens',
    'multiline',
    'showTemplates',
  ]
);
