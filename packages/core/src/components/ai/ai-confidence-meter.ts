import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * AI Confidence Meter Component
 *
 * Visual display of AI confidence levels to build trust through transparency.
 * Shows probabilistic certainty with clear visual indicators and explanations.
 *
 * @element ai-confidence-meter
 *
 * @fires confidence-click - Dispatched when user clicks for more details
 *
 * @prop {number} confidence - Confidence level (0-1)
 * @prop {string} label - Optional label for the confidence
 * @prop {boolean} showPercentage - Display percentage value
 * @prop {boolean} showLabel - Display confidence label (High/Medium/Low)
 * @prop {string} size - Size variant (small, medium, large)
 * @prop {boolean} interactive - Allow clicking for details
 *
 * @example
 * ```html
 * <ai-confidence-meter
 *   confidence="0.95"
 *   label="Match Quality"
 *   showPercentage
 *   showLabel
 * ></ai-confidence-meter>
 * ```
 *
 * @accessibility
 * - ARIA label with confidence value
 * - Semantic color coding (green/yellow/red)
 * - Keyboard accessible when interactive
 *
 * @research
 * - IBM Carbon for AI (2024): Confidence visualization patterns
 * - raw.studio (2024): Building trust through transparency
 * - Microsoft HAX #1: Make clear what the system can do
 */
@customElement('ai-confidence-meter')
export class AIConfidenceMeter extends LitElement {
  @property({ type: Number }) confidence = 0;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showPercentage = true;
  @property({ type: Boolean }) showLabel = true;
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) interactive = false;

  static styles = css`
    :host {
      display: inline-block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .container {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
    }

    .container--interactive {
      cursor: pointer;
      transition: transform 150ms;
    }

    .container--interactive:hover {
      transform: scale(1.02);
    }

    .meter-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .meter-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .meter-track {
      position: relative;
      background: #e5e7eb;
      border-radius: 9999px;
      overflow: hidden;
    }

    .meter-track--small {
      width: 60px;
      height: 6px;
    }

    .meter-track--medium {
      width: 100px;
      height: 8px;
    }

    .meter-track--large {
      width: 150px;
      height: 10px;
    }

    .meter-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 9999px;
      transition:
        width 300ms ease,
        background 300ms ease;
    }

    .meter-fill--high {
      background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
    }

    .meter-fill--medium {
      background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
    }

    .meter-fill--low {
      background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
    }

    .meter-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .confidence-percentage {
      font-weight: 600;
      font-size: 0.875rem;
    }

    .confidence-percentage--high {
      color: #16a34a;
    }

    .confidence-percentage--medium {
      color: #d97706;
    }

    .confidence-percentage--low {
      color: #dc2626;
    }

    .confidence-label {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .confidence-label--high {
      background: #dcfce7;
      color: #166534;
    }

    .confidence-label--medium {
      background: #fef3c7;
      color: #92400e;
    }

    .confidence-label--low {
      background: #fee2e2;
      color: #991b1b;
    }

    .circular-meter {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .circular-meter--small {
      width: 48px;
      height: 48px;
    }

    .circular-meter--medium {
      width: 64px;
      height: 64px;
    }

    .circular-meter--large {
      width: 80px;
      height: 80px;
    }

    .circular-percentage {
      font-weight: 700;
      font-size: 0.875rem;
    }

    svg {
      transform: rotate(-90deg);
    }

    .circle-bg {
      fill: none;
      stroke: #e5e7eb;
    }

    .circle-progress {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset 300ms ease;
    }
  `;

  private _getConfidenceLevel(): 'high' | 'medium' | 'low' {
    if (this.confidence >= 0.8) return 'high';
    if (this.confidence >= 0.5) return 'medium';
    return 'low';
  }

  private _getConfidenceText(): string {
    const level = this._getConfidenceLevel();
    const labels = {
      high: 'High Confidence',
      medium: 'Medium Confidence',
      low: 'Low Confidence',
    };
    return labels[level];
  }

  private _handleClick() {
    if (this.interactive) {
      this.dispatchEvent(
        new CustomEvent('confidence-click', {
          bubbles: true,
          composed: true,
          detail: {
            confidence: this.confidence,
            level: this._getConfidenceLevel(),
          },
        })
      );
    }
  }

  private _renderCircularMeter() {
    const size = this.size === 'small' ? 48 : this.size === 'medium' ? 64 : 80;
    const strokeWidth = this.size === 'small' ? 4 : this.size === 'medium' ? 5 : 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - this.confidence * circumference;
    const level = this._getConfidenceLevel();

    const colors = {
      high: '#22c55e',
      medium: '#f59e0b',
      low: '#ef4444',
    };

    return html`
      <div class="circular-meter circular-meter--${this.size}">
        <svg width=${size} height=${size}>
          <circle
            class="circle-bg"
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
          />
          <circle
            class="circle-progress"
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
            stroke=${colors[level]}
            stroke-dasharray=${circumference}
            stroke-dashoffset=${offset}
          />
        </svg>
        <div
          style="position: absolute; display: flex; flex-direction: column; align-items: center;"
        >
          <span class="circular-percentage confidence-percentage--${level}">
            ${Math.round(this.confidence * 100)}%
          </span>
        </div>
      </div>
    `;
  }

  render() {
    const level = this._getConfidenceLevel();
    const percentage = Math.round(this.confidence * 100);

    return html`
      <div
        class="container ${this.interactive ? 'container--interactive' : ''}"
        role=${this.interactive ? 'button' : 'status'}
        tabindex=${this.interactive ? 0 : -1}
        aria-label="${this.label || 'AI Confidence'}: ${percentage}%"
        @click=${this._handleClick}
        @keydown=${(e: KeyboardEvent) => {
          if (this.interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            this._handleClick();
          }
        }}
        part="container"
      >
        ${this._renderCircularMeter()}

        <div class="meter-wrapper">
          ${this.label ? html` <div class="meter-label">${this.label}</div> ` : ''}

          <div class="meter-track meter-track--${this.size}">
            <div class="meter-fill meter-fill--${level}" style="width: ${percentage}%"></div>
          </div>

          <div class="meter-info">
            ${this.showPercentage
              ? html`
                  <span class="confidence-percentage confidence-percentage--${level}">
                    ${percentage}%
                  </span>
                `
              : ''}
            ${this.showLabel
              ? html`
                  <span class="confidence-label confidence-label--${level}">
                    ${this._getConfidenceText()}
                  </span>
                `
              : ''}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-confidence-meter': AIConfidenceMeter;
  }
}
