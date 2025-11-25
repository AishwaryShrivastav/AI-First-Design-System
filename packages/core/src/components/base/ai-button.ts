import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ButtonVariant, Confidence } from '../../utils/types';

/**
 * AI-enhanced button component with support for AI-generated actions and confidence indicators.
 *
 * @element ai-button
 *
 * @fires click - Dispatched when the button is clicked
 *
 * @slot - Button content
 *
 * @cssprop --ai-button-bg - Background color
 * @cssprop --ai-button-color - Text color
 * @cssprop --ai-button-border - Border style
 * @cssprop --ai-button-radius - Border radius
 * @cssprop --ai-button-padding - Padding
 *
 * @prop {ButtonVariant} variant - Visual variant of the button
 * @prop {boolean} disabled - Whether the button is disabled
 * @prop {boolean} loading - Show loading state (prevents interaction)
 * @prop {boolean} aiGenerated - Indicates this is an AI-suggested action
 * @prop {Confidence} confidence - AI confidence level (0-1) for this action
 *
 * @example
 * ```html
 * <ai-button variant="primary">Click me</ai-button>
 * <ai-button aiGenerated confidence="0.95">AI Suggestion</ai-button>
 * <ai-button loading>Processing...</ai-button>
 * ```
 *
 * @accessibility
 * - Full keyboard support (Enter/Space to activate)
 * - ARIA button role
 * - aria-busy when loading
 * - aria-label includes AI generation info when applicable
 *
 * @reference
 * - WCAG 2.2 Button: https://www.w3.org/WAI/WCAG22/Understanding/keyboard
 * - ARIA Button Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
 * - IBM Carbon for AI: https://carbondesignsystem.com/guidelines/carbon-for-ai/
 */
@customElement('ai-button')
export class AIButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) aiGenerated = false;
  @property({ type: Number }) confidence?: Confidence;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: var(--ai-button-padding, 0.5rem 1rem);
      border: var(--ai-button-border, 1px solid transparent);
      border-radius: var(--ai-button-radius, 0.375rem);
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.5;
      cursor: pointer;
      transition: all 150ms ease;
      background: var(--ai-button-bg, #3b82f6);
      color: var(--ai-button-color, white);
    }

    button:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    button:active:not(:disabled) {
      transform: translateY(0);
    }

    button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Variants */
    :host([variant='secondary']) button {
      background: var(--ai-button-bg, #6b7280);
    }

    :host([variant='ghost']) button {
      background: transparent;
      border-color: currentColor;
      color: var(--ai-button-color, #3b82f6);
    }

    :host([variant='danger']) button {
      background: var(--ai-button-bg, #ef4444);
    }

    /* AI indicator */
    .ai-indicator {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.2);
    }

    .ai-icon {
      width: 1rem;
      height: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 0.25rem;
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

    /* Loading state */
    .loading-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  private _handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('click', {
        bubbles: true,
        composed: true,
        detail: {
          aiGenerated: this.aiGenerated,
          confidence: this.confidence,
        },
      })
    );
  }

  render() {
    const ariaLabel = this.aiGenerated
      ? `AI-generated action${this.confidence ? ` (${Math.round(this.confidence * 100)}% confidence)` : ''}`
      : undefined;

    return html`
      <button
        part="button"
        class="ai-button"
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading}
        aria-label=${ariaLabel || ''}
        @click=${this._handleClick}
      >
        ${this.loading
          ? html`<span class="loading-spinner" role="status" aria-label="Loading"></span>`
          : ''}
        <slot></slot>
        ${this.aiGenerated
          ? html`
              <span class="ai-indicator" part="ai-indicator">
                <span class="ai-icon"></span>
                ${this.confidence ? html`${Math.round(this.confidence * 100)}%` : 'AI'}
              </span>
            `
          : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-button': AIButton;
  }
}
