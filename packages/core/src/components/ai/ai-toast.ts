import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Toast notification type variants
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'ai';

/**
 * AI Toast Notification Component
 *
 * Displays transient notifications for AI events, status updates, and feedback.
 * Designed specifically for AI product workflows with support for streaming updates,
 * action buttons, and AI-specific styling.
 *
 * @element ai-toast
 *
 * @fires dismiss - Dispatched when toast is dismissed
 * @fires action - Dispatched when action button is clicked
 *
 * @prop {ToastType} type - Type/severity of the toast
 * @prop {string} title - Toast title/heading
 * @prop {string} message - Toast message content
 * @prop {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 * @prop {boolean} dismissible - Whether toast can be manually dismissed
 * @prop {string} actionLabel - Label for optional action button
 * @prop {string} position - Position on screen (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
 * @prop {boolean} aiGenerated - Whether this notification is AI-generated
 * @prop {number} confidence - AI confidence level (0-1) if applicable
 * @prop {boolean} streaming - Show streaming indicator
 *
 * @slot icon - Custom icon slot
 * @slot actions - Custom action buttons
 *
 * @csspart container - Toast container
 * @csspart icon - Icon container
 * @csspart content - Content wrapper
 * @csspart title - Title element
 * @csspart message - Message element
 * @csspart actions - Actions container
 * @csspart dismiss - Dismiss button
 *
 * @cssprop --ai-toast-bg - Background color
 * @cssprop --ai-toast-color - Text color
 * @cssprop --ai-toast-border - Border color
 * @cssprop --ai-toast-radius - Border radius
 * @cssprop --ai-toast-shadow - Box shadow
 *
 * @example
 * ```html
 * <ai-toast
 *   type="ai"
 *   title="AI Analysis Complete"
 *   message="Found 3 optimization opportunities"
 *   actionLabel="View Results"
 *   dismissible
 *   aiGenerated
 *   confidence="0.92"
 * ></ai-toast>
 * ```
 *
 * @accessibility
 * - role="alert" for important notifications
 * - role="status" for informational updates
 * - aria-live="polite" for non-urgent updates
 * - Keyboard dismissible (Escape key)
 * - Focus management for action buttons
 * - Screen reader announces toast content
 *
 * @research
 * - WAI-ARIA Alert Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 * - IBM Carbon Notification (2024): Toast design patterns
 *   https://carbondesignsystem.com/components/notification/usage/
 * - Microsoft HAX Guideline #2: Make clear when AI is uncertain
 *   https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 * - PatternFly AI Guidelines: Feedback mechanisms
 *   https://www.patternfly.org/patternfly-ai/ai-guidelines/
 */
@customElement('ai-toast')
export class AIToast extends LitElement {
  @property({ type: String }) type: ToastType = 'info';
  @property({ type: String }) title = '';
  @property({ type: String }) message = '';
  @property({ type: Number }) duration = 5000;
  @property({ type: Boolean }) dismissible = true;
  @property({ type: String }) actionLabel = '';
  @property({ type: String }) position:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center' = 'top-right';
  @property({ type: Boolean }) aiGenerated = false;
  @property({ type: Number }) confidence?: number;
  @property({ type: Boolean }) streaming = false;

  @state() private _visible = true;
  @state() private _exiting = false;

  private _timeoutId?: number;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    }

    .toast {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 0.875rem;
      padding: 1rem 1.125rem;
      background: var(--ai-toast-bg, rgba(255, 255, 255, 0.95));
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--ai-toast-border, rgba(255, 255, 255, 0.2));
      border-radius: var(--ai-toast-radius, 1rem);
      box-shadow: var(
        --ai-toast-shadow,
        0 4px 6px rgba(0, 0, 0, 0.04),
        0 10px 20px rgba(0, 0, 0, 0.08),
        0 20px 40px rgba(0, 0, 0, 0.04)
      );
      color: var(--ai-toast-color, #1e293b);
      min-width: 340px;
      max-width: 440px;
      animation: toast-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .toast--exiting {
      animation: toast-slide-out 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes toast-slide-in {
      from {
        opacity: 0;
        transform: translateY(-1.5rem) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes toast-slide-out {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-1rem) scale(0.96);
      }
    }

    /* Type variants with gradients */
    .toast--info {
      border-left: 3px solid;
      border-image: linear-gradient(180deg, #3b82f6 0%, #60a5fa 100%) 1;
      background: linear-gradient(
        135deg,
        rgba(59, 130, 246, 0.04) 0%,
        rgba(255, 255, 255, 0.95) 100%
      );
    }

    .toast--success {
      border-left: 3px solid;
      border-image: linear-gradient(180deg, #22c55e 0%, #4ade80 100%) 1;
      background: linear-gradient(
        135deg,
        rgba(34, 197, 94, 0.04) 0%,
        rgba(255, 255, 255, 0.95) 100%
      );
    }

    .toast--warning {
      border-left: 3px solid;
      border-image: linear-gradient(180deg, #f59e0b 0%, #fbbf24 100%) 1;
      background: linear-gradient(
        135deg,
        rgba(245, 158, 11, 0.04) 0%,
        rgba(255, 255, 255, 0.95) 100%
      );
    }

    .toast--error {
      border-left: 3px solid;
      border-image: linear-gradient(180deg, #ef4444 0%, #f87171 100%) 1;
      background: linear-gradient(
        135deg,
        rgba(239, 68, 68, 0.04) 0%,
        rgba(255, 255, 255, 0.95) 100%
      );
    }

    .toast--ai {
      border-left: 3px solid;
      border-image: var(--_ai-gradient) 1;
      background: linear-gradient(
        135deg,
        rgba(99, 102, 241, 0.06) 0%,
        rgba(139, 92, 246, 0.04) 50%,
        rgba(217, 70, 239, 0.02) 100%
      );
      box-shadow:
        0 4px 6px rgba(99, 102, 241, 0.06),
        0 10px 20px rgba(139, 92, 246, 0.1),
        0 0 40px rgba(139, 92, 246, 0.08);
    }

    /* Icon */
    .icon-container {
      flex-shrink: 0;
      width: 1.75rem;
      height: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      width: 1.375rem;
      height: 1.375rem;
    }

    .icon--info {
      color: #3b82f6;
      filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
    }

    .icon--success {
      color: #22c55e;
      filter: drop-shadow(0 2px 4px rgba(34, 197, 94, 0.3));
    }

    .icon--warning {
      color: #f59e0b;
      filter: drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3));
    }

    .icon--error {
      color: #ef4444;
      filter: drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3));
    }

    .icon--ai {
      background: var(--_ai-gradient);
      border-radius: 0.375rem;
      padding: 0.25rem;
      color: white;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.35);
      animation: ai-icon-pulse 2s ease-in-out infinite;
    }

    @keyframes ai-icon-pulse {
      0%,
      100% {
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.35);
      }
      50% {
        box-shadow: 0 2px 16px rgba(139, 92, 246, 0.5);
      }
    }

    /* Content */
    .content {
      flex: 1;
      min-width: 0;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.375rem;
    }

    .title {
      font-weight: 650;
      font-size: 0.875rem;
      color: #0f172a;
      letter-spacing: -0.01em;
    }

    .ai-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.1875rem 0.4375rem;
      background: var(--_ai-gradient);
      color: white;
      font-size: 0.5625rem;
      font-weight: 700;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 0 1px 4px rgba(139, 92, 246, 0.3);
    }

    .confidence {
      font-size: 0.6875rem;
      font-weight: 600;
      color: #64748b;
      font-variant-numeric: tabular-nums;
    }

    .message {
      font-size: 0.8125rem;
      color: #64748b;
      line-height: 1.55;
    }

    /* Streaming indicator */
    .streaming-indicator {
      display: inline-flex;
      gap: 0.1875rem;
      margin-left: 0.375rem;
      vertical-align: middle;
    }

    .streaming-dot {
      width: 0.3125rem;
      height: 0.3125rem;
      background: #8b5cf6;
      border-radius: 50%;
      animation: streaming-bounce 1.4s ease-in-out infinite;
    }

    .streaming-dot:nth-child(2) {
      animation-delay: 0.1s;
    }

    .streaming-dot:nth-child(3) {
      animation-delay: 0.2s;
    }

    @keyframes streaming-bounce {
      0%,
      100% {
        opacity: 0.4;
        transform: translateY(0);
      }
      50% {
        opacity: 1;
        transform: translateY(-3px);
      }
    }

    /* Actions */
    .actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.875rem;
    }

    .action-button {
      padding: 0.4375rem 0.875rem;
      background: transparent;
      border: 1.5px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      color: #475569;
    }

    .action-button:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }

    .action-button:active {
      transform: translateY(0);
    }

    .action-button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    .action-button--primary {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      border-color: transparent;
      color: white;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
    }

    .action-button--primary:hover {
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    }

    .toast--ai .action-button--primary {
      background: var(--_ai-gradient);
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
    }

    .toast--ai .action-button--primary:hover {
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
    }

    /* Dismiss button */
    .dismiss-button {
      flex-shrink: 0;
      padding: 0.375rem;
      background: transparent;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      color: #94a3b8;
      transition: all 0.15s ease;
    }

    .dismiss-button:hover {
      background: rgba(0, 0, 0, 0.04);
      color: #64748b;
    }

    .dismiss-button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    .dismiss-icon {
      width: 1.125rem;
      height: 1.125rem;
      display: block;
    }

    /* Progress bar for auto-dismiss */
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(0, 0, 0, 0.05);
      overflow: hidden;
      border-radius: 0 0 1rem 1rem;
    }

    .progress-fill {
      height: 100%;
      background: currentColor;
      animation: countdown linear forwards;
      border-radius: 9999px;
    }

    @keyframes countdown {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this._setupAutoDismiss();
    this._setupKeyboardHandler();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearAutoDismiss();
  }

  private _setupAutoDismiss() {
    if (this.duration > 0) {
      this._timeoutId = window.setTimeout(() => {
        this._dismiss();
      }, this.duration);
    }
  }

  private _clearAutoDismiss() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  private _setupKeyboardHandler() {
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.dismissible) {
        this._dismiss();
      }
    });
  }

  private _dismiss() {
    this._exiting = true;
    setTimeout(() => {
      this._visible = false;
      this.dispatchEvent(
        new CustomEvent('dismiss', {
          bubbles: true,
          composed: true,
        })
      );
    }, 200);
  }

  private _handleAction() {
    this.dispatchEvent(
      new CustomEvent('action', {
        bubbles: true,
        composed: true,
        detail: {
          type: this.type,
          aiGenerated: this.aiGenerated,
        },
      })
    );
  }

  private _renderIcon(): TemplateResult {
    const icons = {
      info: html`<svg class="icon icon--info" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        />
      </svg>`,
      success: html`<svg class="icon icon--success" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>`,
      warning: html`<svg class="icon icon--warning" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>`,
      error: html`<svg class="icon icon--error" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>`,
      ai: html`<svg class="icon icon--ai" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
        />
      </svg>`,
    };

    return html`
      <div class="icon-container" part="icon">
        <slot name="icon">${icons[this.type]}</slot>
      </div>
    `;
  }

  render(): TemplateResult {
    if (!this._visible) {
      return html``;
    }

    const ariaRole = this.type === 'error' || this.type === 'warning' ? 'alert' : 'status';
    const ariaLive = this.type === 'error' ? 'assertive' : 'polite';

    return html`
      <div
        class="toast toast--${this.type} ${this._exiting ? 'toast--exiting' : ''}"
        part="container"
        role=${ariaRole}
        aria-live=${ariaLive}
        tabindex="-1"
      >
        ${this._renderIcon()}

        <div class="content" part="content">
          <div class="header">
            ${this.title ? html`<span class="title" part="title">${this.title}</span>` : ''}
            ${this.aiGenerated ? html`<span class="ai-badge">AI</span>` : ''}
            ${this.confidence !== undefined
              ? html`<span class="confidence">${Math.round(this.confidence * 100)}%</span>`
              : ''}
          </div>

          ${this.message
            ? html`
                <div class="message" part="message">
                  ${this.message}
                  ${this.streaming
                    ? html`
                        <span class="streaming-indicator">
                          <span class="streaming-dot"></span>
                          <span class="streaming-dot"></span>
                          <span class="streaming-dot"></span>
                        </span>
                      `
                    : ''}
                </div>
              `
            : ''}
          ${this.actionLabel
            ? html`
                <div class="actions" part="actions">
                  <button
                    class="action-button action-button--primary"
                    @click=${this._handleAction}
                    aria-label=${this.actionLabel}
                  >
                    ${this.actionLabel}
                  </button>
                  <slot name="actions"></slot>
                </div>
              `
            : html`<slot name="actions"></slot>`}
        </div>

        ${this.dismissible
          ? html`
              <button
                class="dismiss-button"
                part="dismiss"
                @click=${this._dismiss}
                aria-label="Dismiss notification"
              >
                <svg class="dismiss-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            `
          : ''}
        ${this.duration > 0 && !this.streaming
          ? html`
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  style="animation-duration: ${this.duration}ms; color: ${this.type === 'ai'
                    ? '#764ba2'
                    : this.type === 'success'
                      ? '#22c55e'
                      : this.type === 'warning'
                        ? '#f59e0b'
                        : this.type === 'error'
                          ? '#ef4444'
                          : '#3b82f6'}"
                ></div>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-toast': AIToast;
  }
}
