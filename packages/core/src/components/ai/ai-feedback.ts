import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * AI feedback component for collecting user feedback on AI outputs.
 *
 * @element ai-feedback
 *
 * @fires feedback - Dispatched when user provides feedback
 *
 * @slot - Custom feedback content
 *
 * @cssprop --ai-feedback-bg - Background color
 * @cssprop --ai-feedback-border - Border style
 *
 * @prop {boolean} simple - Show simple thumbs up/down only
 * @prop {boolean} detailed - Show detailed feedback form
 * @prop {boolean} inline - Inline layout
 *
 * @example
 * ```html
 * <ai-feedback simple></ai-feedback>
 * <ai-feedback detailed></ai-feedback>
 * ```
 *
 * @accessibility
 * - Keyboard accessible
 * - ARIA labels
 * - Focus management
 *
 * @reference
 * - Microsoft HAX Guideline #13: https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 * - PatternFly AI Guidelines: https://www.patternfly.org/patternfly-ai/ai-guidelines/
 */
@customElement('ai-feedback')
export class AIFeedback extends LitElement {
  @property({ type: Boolean }) simple = false;
  @property({ type: Boolean }) detailed = false;
  @property({ type: Boolean }) inline = false;

  @state() private _feedbackType: 'positive' | 'negative' | null = null;
  @state() private _showDetailedForm = false;
  @state() private _comment = '';
  @state() private _submitted = false;

  static styles = css`
    :host {
      display: block;
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    }

    .feedback-container {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }

    :host([inline]) .feedback-container {
      flex-direction: row;
      align-items: center;
    }

    .feedback-buttons {
      display: flex;
      gap: 0.625rem;
      align-items: center;
    }

    .feedback-label {
      font-size: 0.8125rem;
      color: #64748b;
      font-weight: 500;
    }

    .feedback-button {
      display: inline-flex;
      align-items: center;
      gap: 0.4375rem;
      padding: 0.5625rem 0.875rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 0.625rem;
      background: white;
      cursor: pointer;
      font-size: 0.8125rem;
      font-weight: 500;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    }

    .feedback-button:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .feedback-button:active {
      transform: translateY(0);
    }

    .feedback-button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .feedback-button--selected {
      background: linear-gradient(
        135deg,
        rgba(99, 102, 241, 0.08) 0%,
        rgba(139, 92, 246, 0.06) 100%
      );
      border-color: #8b5cf6;
      color: #7c3aed;
    }

    .feedback-button--positive:hover,
    .feedback-button--positive.feedback-button--selected {
      background: linear-gradient(
        135deg,
        rgba(16, 185, 129, 0.08) 0%,
        rgba(52, 211, 153, 0.06) 100%
      );
      border-color: #10b981;
      color: #059669;
    }

    .feedback-button--negative:hover,
    .feedback-button--negative.feedback-button--selected {
      background: linear-gradient(
        135deg,
        rgba(239, 68, 68, 0.08) 0%,
        rgba(248, 113, 113, 0.06) 100%
      );
      border-color: #f87171;
      color: #dc2626;
    }

    .detailed-form {
      padding: 1.125rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 0.875rem;
      background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 50%, #f0f9ff 100%);
      animation: form-slide-in 0.3s ease-out;
    }

    @keyframes form-slide-in {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .form-label {
      display: block;
      margin-bottom: 0.625rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #475569;
    }

    .form-textarea {
      width: 100%;
      min-height: 6rem;
      padding: 0.875rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 0.625rem;
      font-family: inherit;
      font-size: 0.875rem;
      resize: vertical;
      transition: all 0.15s ease;
      background: white;
    }

    .form-textarea:hover {
      border-color: #cbd5e1;
    }

    .form-textarea:focus {
      outline: none;
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
    }

    .form-actions {
      display: flex;
      gap: 0.625rem;
      margin-top: 0.875rem;
    }

    .submit-button {
      padding: 0.5625rem 1.125rem;
      border: none;
      border-radius: 0.5rem;
      background: var(--_ai-gradient);
      color: white;
      font-weight: 600;
      font-size: 0.8125rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.25);
    }

    .submit-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);
    }

    .submit-button:active {
      transform: translateY(0);
    }

    .submit-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .cancel-button {
      padding: 0.5625rem 1.125rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 0.5rem;
      background: white;
      color: #64748b;
      font-weight: 600;
      font-size: 0.8125rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .cancel-button:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #475569;
    }

    .thank-you {
      padding: 1.125rem;
      border: 1.5px solid rgba(16, 185, 129, 0.2);
      border-radius: 0.875rem;
      background: linear-gradient(
        135deg,
        rgba(240, 253, 244, 0.9) 0%,
        rgba(220, 252, 231, 0.7) 100%
      );
      color: #166534;
      text-align: center;
      font-size: 0.875rem;
      font-weight: 500;
      animation: thank-you-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes thank-you-pop {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  private _handleFeedback(type: 'positive' | 'negative') {
    this._feedbackType = type;

    if (this.simple) {
      this._submitFeedback();
    } else if (this.detailed) {
      this._showDetailedForm = true;
    }
  }

  private _submitFeedback() {
    this.dispatchEvent(
      new CustomEvent('feedback', {
        bubbles: true,
        composed: true,
        detail: {
          type: this._feedbackType,
          comment: this._comment,
          timestamp: new Date().toISOString(),
        },
      })
    );

    this._submitted = true;

    // Reset after 3 seconds
    setTimeout(() => {
      this._submitted = false;
      this._feedbackType = null;
      this._showDetailedForm = false;
      this._comment = '';
    }, 3000);
  }

  private _handleCancel() {
    this._showDetailedForm = false;
    this._feedbackType = null;
    this._comment = '';
  }

  render(): TemplateResult {
    if (this._submitted) {
      return html` <div class="thank-you" role="status">✓ Thank you for your feedback!</div> `;
    }

    return html`
      <div class="feedback-container" part="container">
        <div class="feedback-buttons">
          ${!this.inline ? html`<span class="feedback-label">Was this helpful?</span>` : ''}
          <button
            class="feedback-button feedback-button--positive ${this._feedbackType === 'positive'
              ? 'feedback-button--selected'
              : ''}"
            @click=${() => this._handleFeedback('positive')}
            aria-label="Good response"
            aria-pressed=${this._feedbackType === 'positive'}
          >
            <span>👍</span>
            <span>Yes</span>
          </button>
          <button
            class="feedback-button feedback-button--negative ${this._feedbackType === 'negative'
              ? 'feedback-button--selected'
              : ''}"
            @click=${() => this._handleFeedback('negative')}
            aria-label="Bad response"
            aria-pressed=${this._feedbackType === 'negative'}
          >
            <span>👎</span>
            <span>No</span>
          </button>
        </div>

        ${this._showDetailedForm && this.detailed
          ? html`
              <div class="detailed-form" part="form">
                <label class="form-label" for="feedback-comment">
                  ${this._feedbackType === 'positive'
                    ? 'What did you like?'
                    : 'What could be improved?'}
                </label>
                <textarea
                  id="feedback-comment"
                  class="form-textarea"
                  placeholder="Your feedback helps us improve..."
                  .value=${this._comment}
                  @input=${(e: Event) => (this._comment = (e.target as HTMLTextAreaElement).value)}
                ></textarea>
                <div class="form-actions">
                  <button
                    class="submit-button"
                    @click=${this._submitFeedback}
                    ?disabled=${!this._comment.trim()}
                  >
                    Submit Feedback
                  </button>
                  <button class="cancel-button" @click=${this._handleCancel}>Cancel</button>
                </div>
              </div>
            `
          : ''}

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-feedback': AIFeedback;
  }
}
