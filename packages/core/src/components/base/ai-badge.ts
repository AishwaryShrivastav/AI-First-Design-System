import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Confidence } from '../../utils/types';

/**
 * AI-enhanced badge component for displaying labels, confidence scores, and AI indicators.
 *
 * @element ai-badge
 *
 * @slot - Badge content
 *
 * @cssprop --ai-badge-bg - Background color
 * @cssprop --ai-badge-color - Text color
 * @cssprop --ai-badge-border - Border style
 *
 * @prop {string} variant - Visual variant (info, success, warning, error, ai)
 * @prop {boolean} aiIndicator - Show AI gradient indicator
 * @prop {Confidence} confidence - AI confidence level to display
 * @prop {boolean} dot - Show a dot indicator
 *
 * @example
 * ```html
 * <ai-badge variant="info">Beta</ai-badge>
 * <ai-badge aiIndicator confidence="0.95">AI Generated</ai-badge>
 * <ai-badge variant="success" dot>Online</ai-badge>
 * ```
 *
 * @accessibility
 * - Uses semantic HTML
 * - Sufficient color contrast (WCAG AA)
 * - aria-label for confidence scores
 *
 * @reference
 * - WCAG 2.2 Color Contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
 * - IBM Carbon for AI labels: https://carbondesignsystem.com/guidelines/carbon-for-ai/
 */
@customElement('ai-badge')
export class AIBadge extends LitElement {
  @property({ type: String }) variant: 'info' | 'success' | 'warning' | 'error' | 'ai' = 'info';
  @property({ type: Boolean }) aiIndicator = false;
  @property({ type: Number }) confidence?: Confidence;
  @property({ type: Boolean }) dot = false;

  static styles = css`
    :host {
      display: inline-block;
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4375rem;
      padding: 0.3125rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      line-height: 1.2;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    /* Variants with refined colors */
    .badge--info {
      background: var(--ai-badge-bg, linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%));
      color: var(--ai-badge-color, #0369a1);
      box-shadow: 0 1px 2px rgba(3, 105, 161, 0.08);
    }

    .badge--success {
      background: var(--ai-badge-bg, linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%));
      color: var(--ai-badge-color, #15803d);
      box-shadow: 0 1px 2px rgba(21, 128, 61, 0.08);
    }

    .badge--warning {
      background: var(--ai-badge-bg, linear-gradient(135deg, #fef3c7 0%, #fde68a 100%));
      color: var(--ai-badge-color, #b45309);
      box-shadow: 0 1px 2px rgba(180, 83, 9, 0.08);
    }

    .badge--error {
      background: var(--ai-badge-bg, linear-gradient(135deg, #fee2e2 0%, #fecaca 100%));
      color: var(--ai-badge-color, #dc2626);
      box-shadow: 0 1px 2px rgba(220, 38, 38, 0.08);
    }

    .badge--ai {
      background: var(--_ai-gradient);
      background-size: 200% 200%;
      color: white;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 0 12px rgba(139, 92, 246, 0.25);
      animation: ai-shimmer 3s ease-in-out infinite;
    }

    @keyframes ai-shimmer {
      0%,
      100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    /* AI indicator icon */
    .ai-icon {
      width: 0.75rem;
      height: 0.75rem;
      background: var(--_ai-gradient);
      border-radius: 0.1875rem;
      animation: ai-icon-pulse 2s ease-in-out infinite;
      box-shadow: 0 0 6px rgba(139, 92, 246, 0.4);
    }

    @keyframes ai-icon-pulse {
      0%,
      100% {
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 0 6px rgba(139, 92, 246, 0.4);
      }
      50% {
        opacity: 0.8;
        transform: scale(0.92);
        box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
      }
    }

    /* Dot indicator with glow */
    .dot {
      width: 0.4375rem;
      height: 0.4375rem;
      border-radius: 50%;
      background: currentColor;
      animation: dot-pulse 2s ease-in-out infinite;
    }

    @keyframes dot-pulse {
      0%,
      100% {
        opacity: 1;
        box-shadow: 0 0 0 0 currentColor;
      }
      50% {
        opacity: 0.8;
        box-shadow: 0 0 0 3px transparent;
      }
    }

    .badge--success .dot {
      animation: dot-pulse-success 2s ease-in-out infinite;
    }

    @keyframes dot-pulse-success {
      0%,
      100% {
        box-shadow: 0 0 0 0 rgba(21, 128, 61, 0.4);
      }
      50% {
        box-shadow: 0 0 0 4px rgba(21, 128, 61, 0);
      }
    }

    /* Confidence meter - refined */
    .confidence {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      margin-left: 0.125rem;
    }

    .confidence-bar {
      width: 2.25rem;
      height: 0.25rem;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 9999px;
      overflow: hidden;
      backdrop-filter: blur(4px);
    }

    .confidence-fill {
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 9999px;
      transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
    }
  `;

  render(): TemplateResult {
    const classes = `badge badge--${this.aiIndicator ? 'ai' : this.variant}`;
    const ariaLabel = this.confidence
      ? `AI confidence: ${Math.round(this.confidence * 100)}%`
      : undefined;

    return html`
      <span class=${classes} part="badge" role="status" aria-label=${ariaLabel || ''}>
        ${this.dot ? html`<span class="dot"></span>` : ''}
        ${this.aiIndicator ? html`<span class="ai-icon"></span>` : ''}
        <slot></slot>
        ${this.confidence !== undefined
          ? html`
              <span class="confidence">
                <span class="confidence-bar">
                  <span class="confidence-fill" style="width: ${this.confidence * 100}%"></span>
                </span>
                ${Math.round(this.confidence * 100)}%
              </span>
            `
          : ''}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-badge': AIBadge;
  }
}
