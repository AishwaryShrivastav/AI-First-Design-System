import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Complete AI chat interface with messages, input, and controls.
 *
 * @element ai-chat-interface
 *
 * @fires message-send - Dispatched when user sends a message
 * @fires new-conversation - Dispatched when user starts new conversation
 *
 * @slot header - Custom header content
 * @slot messages - Chat messages (auto-managed if not provided)
 * @slot footer - Custom footer content
 *
 * @cssprop --ai-chat-bg - Background color
 * @cssprop --ai-chat-border - Border style
 * @cssprop --ai-chat-height - Container height
 *
 * @prop {boolean} showHeader - Show default header
 * @prop {boolean} showFooter - Show default footer
 * @prop {string} placeholder - Input placeholder text
 * @prop {boolean} disabled - Disable input
 *
 * @example
 * ```html
 * <ai-chat-interface placeholder="Ask me anything...">
 *   <div slot="messages">
 *     <ai-chat-message role="ai">Hello!</ai-chat-message>
 *   </div>
 * </ai-chat-interface>
 * ```
 *
 * @accessibility
 * - Keyboard navigation
 * - Screen reader support for messages
 * - Focus management
 * - ARIA labels and roles
 *
 * @reference
 * - WCAG 2.2 Chat Widget patterns
 * - Modern chat UI patterns (ChatGPT, Claude, Slack)
 * - IBM Carbon Chat component
 */
@customElement('ai-chat-interface')
export class AIChatInterface extends LitElement {
  @property({ type: Boolean }) showHeader = true;
  @property({ type: Boolean }) showFooter = true;
  @property({ type: String }) placeholder = 'Type a message...';
  @property({ type: Boolean }) disabled = false;

  @state() private _inputValue = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: var(--ai-chat-height, 600px);
      border: var(--ai-chat-border, 1px solid #e5e7eb);
      border-radius: 0.5rem;
      background: var(--ai-chat-bg, white);
      overflow: hidden;
    }

    .chat-header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .chat-title {
      font-weight: 600;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ai-status {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .status-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: #10b981;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    .chat-controls {
      display: flex;
      gap: 0.5rem;
    }

    .control-button {
      padding: 0.5rem;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 150ms ease;
    }

    .control-button:hover {
      background: #f3f4f6;
      color: #1f2937;
    }

    .control-button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      scroll-behavior: smooth;
    }

    .chat-messages::-webkit-scrollbar {
      width: 0.5rem;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: #f3f4f6;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 0.25rem;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    .chat-footer {
      flex-shrink: 0;
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .chat-input-wrapper {
      display: flex;
      gap: 0.5rem;
      align-items: flex-end;
    }

    .chat-input {
      flex: 1;
      min-height: 2.5rem;
      max-height: 10rem;
      padding: 0.625rem 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-family: inherit;
      font-size: 0.875rem;
      resize: none;
      transition: all 150ms ease;
    }

    .chat-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .chat-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: #f3f4f6;
    }

    .send-button {
      padding: 0.625rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background: #3b82f6;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 150ms ease;
    }

    .send-button:hover:not(:disabled) {
      background: #2563eb;
    }

    .send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .send-button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;

  private _handleSend() {
    if (!this._inputValue.trim() || this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('message-send', {
        bubbles: true,
        composed: true,
        detail: { message: this._inputValue },
      })
    );

    this._inputValue = '';
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this._handleSend();
    }
  }

  private _handleNewConversation() {
    this.dispatchEvent(
      new CustomEvent('new-conversation', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render(): TemplateResult {
    return html`
      ${this.showHeader
        ? html`
            <div class="chat-header" part="header">
              <div class="chat-title">
                <span>AI Assistant</span>
                <span class="ai-status">
                  <span class="status-dot"></span>
                  Online
                </span>
              </div>
              <div class="chat-controls">
                <button
                  class="control-button"
                  @click=${this._handleNewConversation}
                  title="New conversation"
                  aria-label="Start new conversation"
                >
                  ➕
                </button>
                <slot name="header"></slot>
              </div>
            </div>
          `
        : ''}

      <div class="chat-messages" part="messages" role="log" aria-live="polite">
        <slot name="messages"></slot>
      </div>

      ${this.showFooter
        ? html`
            <div class="chat-footer" part="footer">
              <div class="chat-input-wrapper">
                <textarea
                  class="chat-input"
                  part="input"
                  placeholder=${this.placeholder}
                  .value=${this._inputValue}
                  ?disabled=${this.disabled}
                  @input=${(e: Event) =>
                    (this._inputValue = (e.target as HTMLTextAreaElement).value)}
                  @keydown=${this._handleKeyDown}
                  rows="1"
                  aria-label="Message input"
                ></textarea>
                <button
                  class="send-button"
                  part="send-button"
                  @click=${this._handleSend}
                  ?disabled=${this.disabled || !this._inputValue.trim()}
                  aria-label="Send message"
                >
                  Send
                </button>
              </div>
              <slot name="footer"></slot>
            </div>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-chat-interface': AIChatInterface;
  }
}
