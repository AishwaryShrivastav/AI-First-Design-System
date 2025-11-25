import { createReactComponent } from '../create-react-component';

export interface AIChatInterfaceProps {
  showHeader?: boolean;
  showFooter?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onMessageSend?: (e: CustomEvent<{ message: string }>) => void;
  onNewConversation?: (e: CustomEvent) => void;
}

export const AIChatInterface = createReactComponent<HTMLElement, AIChatInterfaceProps>(
  'ai-chat-interface',
  ['showHeader', 'showFooter', 'placeholder', 'disabled']
);

