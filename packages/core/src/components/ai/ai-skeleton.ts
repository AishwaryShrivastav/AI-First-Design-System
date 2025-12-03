import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * AI skeleton loader component for content placeholders during AI generation.
 *
 * @element ai-skeleton
 *
 * @cssprop --ai-skeleton-bg - Background color
 * @cssprop --ai-skeleton-highlight - Shimmer highlight color
 *
 * @prop {string} variant - Skeleton variant (text, circular, rectangular, custom)
 * @prop {string} width - Width (CSS value)
 * @prop {string} height - Height (CSS value)
 * @prop {boolean} animated - Enable shimmer animation
 * @prop {number} lines - Number of text lines (for text variant)
 *
 * @example
 * ```html
 * <ai-skeleton variant="text" lines="3"></ai-skeleton>
 * <ai-skeleton variant="circular" width="40px" height="40px"></ai-skeleton>
 * <ai-skeleton variant="rectangular" width="100%" height="200px"></ai-skeleton>
 * ```
 *
 * @accessibility
 * - aria-busy for screen readers
 * - aria-label describing loading state
 *
 * @reference
 * - Material Design skeleton patterns
 * - Modern loading patterns from Vercel, GitHub
 */
@customElement('ai-skeleton')
export class AISkeleton extends LitElement {
  @property({ type: String }) variant: 'text' | 'circular' | 'rectangular' | 'custom' = 'text';
  @property({ type: String }) width = '';
  @property({ type: String }) height = '';
  @property({ type: Boolean }) animated = true;
  @property({ type: Number }) lines = 1;

  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      background: var(--ai-skeleton-bg, linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%));
      border-radius: 0.5rem;
      position: relative;
      overflow: hidden;
    }

    :host([animated]) .skeleton::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--ai-skeleton-highlight, rgba(255, 255, 255, 0.6)) 50%,
        transparent 100%
      );
      animation: shimmer 1.8s ease-in-out infinite;
    }

    :host([animated]) .skeleton::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 30%,
        rgba(139, 92, 246, 0.03) 50%,
        transparent 70%
      );
      animation: shimmer-glow 2.4s ease-in-out infinite;
      animation-delay: 0.3s;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @keyframes shimmer-glow {
      0% {
        transform: translateX(-100%);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    .skeleton--text {
      height: 1rem;
      margin-bottom: 0.625rem;
      border-radius: 0.375rem;
    }

    .skeleton--text:last-child {
      width: 75%;
      margin-bottom: 0;
    }

    .skeleton--circular {
      border-radius: 50%;
      box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.02);
    }

    .skeleton--rectangular {
      border-radius: 0.75rem;
    }

    .skeleton--custom {
      border-radius: var(--ai-skeleton-radius, 0.5rem);
    }
  `;

  render(): TemplateResult {
    const style = `
      ${this.width ? `width: ${this.width};` : ''}
      ${this.height ? `height: ${this.height};` : ''}
    `;

    if (this.variant === 'text' && this.lines > 1) {
      return html`
        ${Array.from(
          { length: this.lines },
          (_, i) =>
            html`<div
              class="skeleton skeleton--text"
              part="skeleton"
              role="status"
              aria-busy="true"
              aria-label="Loading content"
              style=${i === 0 && style ? style : ''}
            ></div>`
        )}
      `;
    }

    return html`
      <div
        class="skeleton skeleton--${this.variant}"
        part="skeleton"
        role="status"
        aria-busy="true"
        aria-label="Loading content"
        style=${style}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-skeleton': AISkeleton;
  }
}
