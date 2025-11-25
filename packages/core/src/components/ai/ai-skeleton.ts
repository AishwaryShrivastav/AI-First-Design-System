import { LitElement, html, css } from 'lit';
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
      background: var(--ai-skeleton-bg, #e5e7eb);
      border-radius: 0.25rem;
      position: relative;
      overflow: hidden;
    }

    :host([animated]) .skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        var(--ai-skeleton-highlight, rgba(255, 255, 255, 0.5)),
        transparent
      );
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .skeleton--text {
      height: 1rem;
      margin-bottom: 0.5rem;
    }

    .skeleton--text:last-child {
      width: 80%;
      margin-bottom: 0;
    }

    .skeleton--circular {
      border-radius: 50%;
    }

    .skeleton--rectangular {
      border-radius: 0.5rem;
    }

    .skeleton--custom {
      border-radius: var(--ai-skeleton-radius, 0.25rem);
    }
  `;

  render() {
    const style = `
      ${this.width ? `width: ${this.width};` : ''}
      ${this.height ? `height: ${this.height};` : ''}
    `;

    if (this.variant === 'text' && this.lines > 1) {
      return html`
        ${Array.from({ length: this.lines }, (_, i) =>
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

