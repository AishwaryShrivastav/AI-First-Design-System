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
    }

    .feedback-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    :host([inline]) .feedback-container {
      flex-direction: row;
      align-items: center;
    }

    .feedback-buttons {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .feedback-label {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    .feedback-button {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      background: white;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 150ms ease;
    }

    .feedback-button:hover {
      background: #f9fafb;
      border-color: #d1d5db;
    }

    .feedback-button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .feedback-button--selected {
      background: #eff6ff;
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .feedback-button--positive:hover,
    .feedback-button--positive.feedback-button--selected {
      background: #f0fdf4;
      border-color: #22c55e;
      color: #22c55e;
    }

    .feedback-button--negative:hover,
    .feedback-button--negative.feedback-button--selected {
      background: #fef2f2;
      border-color: #ef4444;
      color: #ef4444;
    }

    .detailed-form {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #f9fafb;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .form-textarea {
      width: 100%;
      min-height: 6rem;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-family: inherit;
      font-size: 0.875rem;
      resize: vertical;
    }

    .form-textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }

    .submit-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      background: #3b82f6;
      color: white;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 150ms ease;
    }

    .submit-button:hover {
      background: #2563eb;
    }

    .submit-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .cancel-button {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: white;
      color: #374151;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 150ms ease;
    }

    .cancel-button:hover {
      background: #f9fafb;
    }

    .thank-you {
      padding: 1rem;
      border: 1px solid #d1fae5;
      border-radius: 0.5rem;
      background: #f0fdf4;
      color: #166534;
      text-align: center;
      font-size: 0.875rem;
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
