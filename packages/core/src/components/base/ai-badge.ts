import { LitElement, html, css } from 'lit';
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
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
    }

    /* Variants */
    .badge--info {
      background: var(--ai-badge-bg, #dbeafe);
      color: var(--ai-badge-color, #1e40af);
    }

    .badge--success {
      background: var(--ai-badge-bg, #d1fae5);
      color: var(--ai-badge-color, #065f46);
    }

    .badge--warning {
      background: var(--ai-badge-bg, #fef3c7);
      color: var(--ai-badge-color, #92400e);
    }

    .badge--error {
      background: var(--ai-badge-bg, #fee2e2);
      color: var(--ai-badge-color, #991b1b);
    }

    .badge--ai {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      animation: shimmer 3s linear infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    /* AI indicator */
    .ai-icon {
      width: 0.75rem;
      height: 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 0.25rem;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Dot indicator */
    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: currentColor;
    }

    /* Confidence meter */
    .confidence {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .confidence-bar {
      width: 2rem;
      height: 0.25rem;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 0.125rem;
      overflow: hidden;
    }

    .confidence-fill {
      height: 100%;
      background: currentColor;
      transition: width 300ms ease;
    }
  `;

  render() {
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
                  <span
                    class="confidence-fill"
                    style="width: ${this.confidence * 100}%"
                  ></span>
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

