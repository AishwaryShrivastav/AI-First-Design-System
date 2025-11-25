import { createReactComponent } from '../create-react-component';
import type { InputSize } from '@ai-first-ds/core';

export interface AIInputProps {
  value?: string;
  placeholder?: string;
  size?: InputSize;
  disabled?: boolean;
  error?: boolean;
  aiSuggestions?: boolean;
  suggestion?: string;
  onInput?: (e: CustomEvent<{ value: string }>) => void;
  onChange?: (e: CustomEvent<{ value: string }>) => void;
  onAiSuggestion?: (e: CustomEvent<{ accepted: boolean; value: string }>) => void;
}

export const AIInput = createReactComponent<HTMLElement, AIInputProps>('ai-input', [
  'value',
  'placeholder',
  'size',
  'disabled',
  'error',
  'aiSuggestions',
  'suggestion',
]);
