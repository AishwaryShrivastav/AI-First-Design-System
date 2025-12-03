import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * AI Error Recovery Component
 *
 * Provides graceful error handling for AI failures with clear explanations,
 * recovery suggestions, and fallback options to maintain user flow.
 *
 * @element ai-error-recovery
 *
 * @fires retry - Dispatched when user requests retry
 * @fires fallback - Dispatched when user chooses non-AI alternative
 * @fires report - Dispatched when user reports the error
 *
 * @prop {string} errorType - Type of error (timeout, invalid, api, generation)
 * @prop {string} errorMessage - Human-readable error description
 * @prop {boolean} showFallback - Display fallback option
 * @prop {boolean} allowRetry - Enable retry button
 *
 * @example
 * ```html
 * <ai-error-recovery
 *   errorType="timeout"
 *   errorMessage="AI response took too long"
 *   showFallback
 *   allowRetry
 * ></ai-error-recovery>
 * ```
 *
 * @accessibility
 * - ARIA alert role for error announcements
 * - Keyboard navigation for actions
 * - Screen reader friendly error descriptions
 *
 * @research
 * - ideatheorem.com (2024): Proactive error management in AI UX
 * - Slash.co (2024): Fallback options for AI failures
 * - Microsoft HAX #8: Graceful handling of errors
 */
@customElement('ai-error-recovery')
export class AIErrorRecovery extends LitElement {
  @property({ type: String }) errorType: 'timeout' | 'invalid' | 'api' | 'generation' =
    'generation';
  @property({ type: String }) errorMessage = 'An error occurred while processing your request';
  @property({ type: Boolean }) showFallback = true;
  @property({ type: Boolean }) allowRetry = true;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .container {
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      background: #fef2f2;
      overflow: hidden;
    }

    .error-header {
      padding: 1rem;
      background: #fee2e2;
      border-bottom: 1px solid #fecaca;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .error-icon {
      width: 2rem;
      height: 2rem;
      background: #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .error-title {
      font-weight: 600;
      color: #991b1b;
      font-size: 1rem;
    }

    .error-body {
      padding: 1rem;
    }

    .error-message {
      color: #7f1d1d;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .suggestions {
      background: white;
      border: 1px solid #fecaca;
      border-radius: 0.375rem;
      padding: 0.75rem;
      margin-bottom: 1rem;
    }

    .suggestions-title {
      font-weight: 600;
      color: #991b1b;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .suggestions-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .suggestions-list li {
      padding: 0.375rem 0;
      color: #7f1d1d;
      font-size: 0.875rem;
      line-height: 1.5;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .suggestions-list li::before {
      content: '→';
      color: #ef4444;
      font-weight: 600;
      flex-shrink: 0;
    }

    .actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .action-button {
      padding: 0.625rem 1.25rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 150ms;
    }

    .action-button--primary {
      background: #ef4444;
      color: white;
    }

    .action-button--primary:hover {
      background: #dc2626;
    }

    .action-button--secondary {
      background: white;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .action-button--secondary:hover {
      background: #fef2f2;
    }

    .action-button--tertiary {
      background: transparent;
      color: #991b1b;
      text-decoration: underline;
      padding: 0.625rem 0.5rem;
    }

    .action-button--tertiary:hover {
      color: #7f1d1d;
    }

    .action-button:focus-visible {
      outline: 2px solid #ef4444;
      outline-offset: 2px;
    }

    .error-details {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #fecaca;
    }

    .error-details-toggle {
      background: none;
      border: none;
      color: #991b1b;
      font-size: 0.875rem;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
    }

    .error-details-toggle:hover {
      color: #7f1d1d;
    }
  `;

  private _getSuggestions(): string[] {
    const suggestions: Record<typeof this.errorType, string[]> = {
      timeout: [
        'Try breaking your request into smaller parts',
        'Check your internet connection',
        'Click retry to try again',
      ],
      invalid: [
        'Review your input for clarity',
        'Try rephrasing your request',
        'Check for special characters or formatting issues',
      ],
      api: [
        'The AI service is temporarily unavailable',
        'Try again in a few moments',
        'Use the fallback option for immediate results',
      ],
      generation: [
        "The AI couldn't generate a suitable response",
        'Try modifying your request',
        'Provide more context or details',
      ],
    };

    return suggestions[this.errorType] || suggestions.generation;
  }

  private _getErrorTitle(): string {
    const titles: Record<typeof this.errorType, string> = {
      timeout: 'Request Timed Out',
      invalid: 'Invalid Request',
      api: 'Service Unavailable',
      generation: 'Generation Failed',
    };

    return titles[this.errorType] || 'An Error Occurred';
  }

  private _handleRetry() {
    this.dispatchEvent(
      new CustomEvent('retry', {
        bubbles: true,
        composed: true,
        detail: { errorType: this.errorType },
      })
    );
  }

  private _handleFallback() {
    this.dispatchEvent(
      new CustomEvent('fallback', {
        bubbles: true,
        composed: true,
        detail: { errorType: this.errorType },
      })
    );
  }

  private _handleReport() {
    this.dispatchEvent(
      new CustomEvent('report', {
        bubbles: true,
        composed: true,
        detail: {
          errorType: this.errorType,
          errorMessage: this.errorMessage,
        },
      })
    );
  }

  render(): TemplateResult {
    return html`
      <div class="container" role="alert" aria-live="assertive" part="container">
        <div class="error-header">
          <div class="error-icon" aria-hidden="true">!</div>
          <div class="error-title">${this._getErrorTitle()}</div>
        </div>

        <div class="error-body">
          <div class="error-message">${this.errorMessage}</div>

          <div class="suggestions">
            <div class="suggestions-title">What you can try:</div>
            <ul class="suggestions-list">
              ${this._getSuggestions().map(suggestion => html` <li>${suggestion}</li> `)}
            </ul>
          </div>

          <div class="actions">
            ${this.allowRetry
              ? html`
                  <button class="action-button action-button--primary" @click=${this._handleRetry}>
                    Try Again
                  </button>
                `
              : ''}
            ${this.showFallback
              ? html`
                  <button
                    class="action-button action-button--secondary"
                    @click=${this._handleFallback}
                  >
                    Use Non-AI Option
                  </button>
                `
              : ''}

            <button class="action-button action-button--tertiary" @click=${this._handleReport}>
              Report Issue
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-error-recovery': AIErrorRecovery;
  }
}
