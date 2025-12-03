import { LitElement, html, css, TemplateResult } from 'lit';
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
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
      --_ai-glow: 0 0 20px rgba(139, 92, 246, 0.4);
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      padding: var(--ai-button-padding, 0.625rem 1.25rem);
      border: var(--ai-button-border, none);
      border-radius: var(--ai-button-radius, 0.625rem);
      font-family: inherit;
      font-size: 0.9375rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.5;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      background: var(--ai-button-bg, linear-gradient(135deg, #3b82f6 0%, #2563eb 100%));
      color: var(--ai-button-color, white);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 4px 12px rgba(59, 130, 246, 0.15);
      overflow: hidden;
    }

    button::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.08),
        0 8px 24px rgba(59, 130, 246, 0.25);
    }

    button:hover:not(:disabled)::before {
      opacity: 1;
    }

    button:active:not(:disabled) {
      transform: translateY(0);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 2px 8px rgba(59, 130, 246, 0.15);
    }

    button:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 3px rgba(59, 130, 246, 0.4),
        0 4px 12px rgba(59, 130, 246, 0.2);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    /* Variants */
    :host([variant='secondary']) button {
      background: var(--ai-button-bg, linear-gradient(135deg, #4b5563 0%, #374151 100%));
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 4px 12px rgba(75, 85, 99, 0.15);
    }

    :host([variant='secondary']) button:hover:not(:disabled) {
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.08),
        0 8px 24px rgba(75, 85, 99, 0.25);
    }

    :host([variant='ghost']) button {
      background: transparent;
      border: 1.5px solid rgba(59, 130, 246, 0.3);
      color: var(--ai-button-color, #3b82f6);
      box-shadow: none;
    }

    :host([variant='ghost']) button:hover:not(:disabled) {
      background: rgba(59, 130, 246, 0.08);
      border-color: rgba(59, 130, 246, 0.5);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
    }

    :host([variant='danger']) button {
      background: var(--ai-button-bg, linear-gradient(135deg, #ef4444 0%, #dc2626 100%));
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 4px 12px rgba(239, 68, 68, 0.2);
    }

    :host([variant='danger']) button:hover:not(:disabled) {
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.08),
        0 8px 24px rgba(239, 68, 68, 0.3);
    }

    /* AI Generated styling */
    :host([aiGenerated]) button {
      background: var(--_ai-gradient);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        var(--_ai-glow);
    }

    :host([aiGenerated]) button:hover:not(:disabled) {
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.08),
        0 0 30px rgba(139, 92, 246, 0.5);
    }

    /* AI indicator */
    .ai-indicator {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.1875rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .ai-icon {
      width: 0.875rem;
      height: 0.875rem;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.6) 100%
      );
      border-radius: 0.25rem;
      animation: ai-pulse 2s ease-in-out infinite;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
    }

    @keyframes ai-pulse {
      0%,
      100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(0.95);
      }
    }

    /* Loading state */
    .loading-spinner {
      width: 1.125rem;
      height: 1.125rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
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

  render(): TemplateResult {
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
