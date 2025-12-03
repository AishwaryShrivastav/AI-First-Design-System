import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AIRole } from '../../utils/types';

/**
 * AI chat message bubble component for conversational interfaces.
 *
 * @element ai-chat-message
 *
 * @fires regenerate - Dispatched when user requests to regenerate the message
 * @fires copy - Dispatched when user copies the message
 * @fires feedback - Dispatched when user provides feedback (like/dislike)
 *
 * @slot - Message content
 * @slot actions - Custom action buttons
 *
 * @cssprop --ai-message-bg - Background color
 * @cssprop --ai-message-color - Text color
 * @cssprop --ai-message-radius - Border radius
 *
 * @prop {AIRole} role - Role in conversation (user, ai, system)
 * @prop {boolean} streaming - Whether message is currently streaming
 * @prop {string} timestamp - Message timestamp
 * @prop {boolean} showActions - Show action buttons (copy, regenerate, feedback)
 * @prop {boolean} error - Show error state
 *
 * @example
 * ```html
 * <ai-chat-message role="user">Hello, how can you help?</ai-chat-message>
 * <ai-chat-message role="ai" streaming showActions>
 *   I can help you with...
 * </ai-chat-message>
 * ```
 *
 * @accessibility
 * - Semantic HTML with proper roles
 * - Keyboard navigation for actions
 * - Screen reader announcements for streaming
 * - Clear visual distinction between roles
 *
 * @reference
 * - ARIA Live Regions: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
 * - IBM Carbon Chat UI patterns
 * - Modern AI chat interfaces (ChatGPT, Claude)
 */
@customElement('ai-chat-message')
export class AIChatMessage extends LitElement {
  @property({ type: String }) role: AIRole = 'ai';
  @property({ type: Boolean }) streaming = false;
  @property({ type: String }) timestamp = '';
  @property({ type: Boolean }) showActions = false;
  @property({ type: Boolean }) error = false;

  static styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    .message-wrapper {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }

    :host([role='user']) .message-wrapper {
      flex-direction: row-reverse;
    }

    .avatar {
      flex-shrink: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    :host([role='user']) .avatar {
      background: #3b82f6;
      color: white;
    }

    :host([role='ai']) .avatar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    :host([role='system']) .avatar {
      background: #6b7280;
      color: white;
    }

    .message-content {
      flex: 1;
      min-width: 0;
    }

    .message-bubble {
      padding: 0.75rem 1rem;
      border-radius: var(--ai-message-radius, 0.75rem);
      background: var(--ai-message-bg, #f3f4f6);
      color: var(--ai-message-color, inherit);
      word-wrap: break-word;
    }

    :host([role='user']) .message-bubble {
      background: var(--ai-message-bg, #3b82f6);
      color: var(--ai-message-color, white);
    }

    :host([error]) .message-bubble {
      background: #fee2e2;
      border: 1px solid #ef4444;
      color: #991b1b;
    }

    .message-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.25rem;
      padding: 0 0.25rem;
      font-size: 0.75rem;
      color: #6b7280;
    }

    :host([role='user']) .message-meta {
      justify-content: flex-end;
    }

    .streaming-indicator {
      display: inline-flex;
      gap: 0.25rem;
      align-items: center;
    }

    .streaming-dot {
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background: currentColor;
      animation: pulse 1.5s ease-in-out infinite;
    }

    .streaming-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .streaming-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
    }

    .message-actions {
      display: flex;
      gap: 0.25rem;
      opacity: 0;
      transition: opacity 150ms ease;
    }

    :host(:hover) .message-actions,
    .message-actions:focus-within {
      opacity: 1;
    }

    .action-button {
      padding: 0.375rem;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 150ms ease;
    }

    .action-button:hover {
      background: #f3f4f6;
      color: #1f2937;
    }

    .action-button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;

  private _handleCopy() {
    const content = this.textContent || '';
    navigator.clipboard.writeText(content).then(() => {
      this.dispatchEvent(
        new CustomEvent('copy', {
          bubbles: true,
          composed: true,
          detail: { content },
        })
      );
    });
  }

  private _handleRegenerate() {
    this.dispatchEvent(
      new CustomEvent('regenerate', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleFeedback(positive: boolean) {
    this.dispatchEvent(
      new CustomEvent('feedback', {
        bubbles: true,
        composed: true,
        detail: { positive },
      })
    );
  }

  render(): TemplateResult {
    const roleLabel = this.role === 'user' ? 'You' : this.role === 'ai' ? 'AI' : 'System';

    return html`
      <div class="message-wrapper" part="wrapper" role="article">
        <div class="avatar" part="avatar" aria-label=${roleLabel}>
          ${this.role === 'user' ? '👤' : this.role === 'ai' ? '🤖' : 'ℹ️'}
        </div>
        <div class="message-content">
          <div
            class="message-bubble"
            part="bubble"
            role=${this.streaming ? 'status' : undefined}
            aria-live=${this.streaming ? 'polite' : undefined}
            aria-atomic=${this.streaming ? 'true' : undefined}
          >
            <slot></slot>
          </div>
          <div class="message-meta" part="meta">
            ${this.streaming
              ? html`
                  <span class="streaming-indicator">
                    <span class="streaming-dot"></span>
                    <span class="streaming-dot"></span>
                    <span class="streaming-dot"></span>
                    Generating...
                  </span>
                `
              : ''}
            ${this.timestamp ? html`<span>${this.timestamp}</span>` : ''}
            ${this.showActions && this.role === 'ai' && !this.streaming
              ? html`
                  <div class="message-actions" part="actions">
                    <button
                      class="action-button"
                      @click=${this._handleCopy}
                      title="Copy message"
                      aria-label="Copy message"
                    >
                      📋
                    </button>
                    <button
                      class="action-button"
                      @click=${this._handleRegenerate}
                      title="Regenerate response"
                      aria-label="Regenerate response"
                    >
                      🔄
                    </button>
                    <button
                      class="action-button"
                      @click=${() => this._handleFeedback(true)}
                      title="Good response"
                      aria-label="Good response"
                    >
                      👍
                    </button>
                    <button
                      class="action-button"
                      @click=${() => this._handleFeedback(false)}
                      title="Bad response"
                      aria-label="Bad response"
                    >
                      👎
                    </button>
                    <slot name="actions"></slot>
                  </div>
                `
              : ''}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-chat-message': AIChatMessage;
  }
}
