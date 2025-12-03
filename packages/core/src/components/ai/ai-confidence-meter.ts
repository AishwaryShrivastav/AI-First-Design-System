import { LitElement, html, css, TemplateResult } from 'lit';
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
      gap: 1rem;
      padding: 0.5rem;
      border-radius: 1rem;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .container--interactive {
      cursor: pointer;
    }

    .container--interactive:hover {
      transform: translateY(-2px);
      background: rgba(99, 102, 241, 0.04);
    }

    .meter-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .meter-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #475569;
      letter-spacing: -0.01em;
    }

    .meter-track {
      position: relative;
      background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 100%);
      border-radius: 9999px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    .meter-track--small {
      width: 70px;
      height: 6px;
    }

    .meter-track--medium {
      width: 110px;
      height: 8px;
    }

    .meter-track--large {
      width: 160px;
      height: 10px;
    }

    .meter-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 9999px;
      transition:
        width 500ms cubic-bezier(0.4, 0, 0.2, 1),
        background 300ms ease;
    }

    .meter-fill--high {
      background: linear-gradient(90deg, #22c55e 0%, #10b981 50%, #14b8a6 100%);
      box-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
    }

    .meter-fill--medium {
      background: linear-gradient(90deg, #f59e0b 0%, #f97316 50%, #fb923c 100%);
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
    }

    .meter-fill--low {
      background: linear-gradient(90deg, #ef4444 0%, #f43f5e 50%, #fb7185 100%);
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
    }

    .meter-info {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    .confidence-percentage {
      font-weight: 700;
      font-size: 0.875rem;
      font-variant-numeric: tabular-nums;
    }

    .confidence-percentage--high {
      color: #059669;
    }

    .confidence-percentage--medium {
      color: #d97706;
    }

    .confidence-percentage--low {
      color: #dc2626;
    }

    .confidence-label {
      padding: 0.3125rem 0.625rem;
      border-radius: 9999px;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .confidence-label--high {
      background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
      color: #166534;
      box-shadow: 0 1px 2px rgba(22, 101, 52, 0.08);
    }

    .confidence-label--medium {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      color: #92400e;
      box-shadow: 0 1px 2px rgba(146, 64, 14, 0.08);
    }

    .confidence-label--low {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      color: #991b1b;
      box-shadow: 0 1px 2px rgba(153, 27, 27, 0.08);
    }

    .circular-meter {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
    }

    .circular-meter--small {
      width: 52px;
      height: 52px;
    }

    .circular-meter--medium {
      width: 72px;
      height: 72px;
    }

    .circular-meter--large {
      width: 92px;
      height: 92px;
    }

    .circular-percentage {
      font-weight: 800;
      font-size: 0.9375rem;
      font-variant-numeric: tabular-nums;
    }

    svg {
      transform: rotate(-90deg);
    }

    .circle-bg {
      fill: none;
      stroke: #f1f5f9;
    }

    .circle-progress {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
      filter: drop-shadow(0 0 6px currentColor);
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

  render(): TemplateResult {
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
