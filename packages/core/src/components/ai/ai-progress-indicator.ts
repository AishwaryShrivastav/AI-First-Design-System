import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Step configuration for multi-stage progress
 */
export interface ProgressStep {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Optional description of the step */
  description?: string;
  /** Status of the step */
  status: 'pending' | 'active' | 'completed' | 'error';
  /** Optional estimated duration in seconds */
  estimatedDuration?: number;
}

/**
 * AI Progress Indicator Component
 *
 * Multi-stage progress indicator for AI processing workflows.
 * Shows step-by-step progress with ETA calculation, cancellable operations,
 * and clear visual feedback for each stage of AI processing.
 *
 * @element ai-progress-indicator
 *
 * @fires step-change - Dispatched when current step changes
 * @fires cancel - Dispatched when user cancels the operation
 * @fires complete - Dispatched when all steps complete
 *
 * @prop {ProgressStep[]} steps - Array of progress steps
 * @prop {number} currentStep - Index of current active step (0-based)
 * @prop {boolean} cancellable - Whether operation can be cancelled
 * @prop {boolean} showEta - Show estimated time remaining
 * @prop {string} variant - Visual variant (linear, circular, steps)
 * @prop {string} size - Size variant (small, medium, large)
 * @prop {string} statusMessage - Current status message to display
 *
 * @slot header - Optional header content above the progress indicator
 * @slot footer - Optional footer content below the progress indicator
 *
 * @csspart container - Main container
 * @csspart step - Individual step element
 * @csspart progress-bar - Progress bar track
 * @csspart progress-fill - Progress bar fill
 * @csspart eta - ETA display element
 *
 * @cssprop --ai-progress-primary - Primary progress color
 * @cssprop --ai-progress-bg - Background track color
 * @cssprop --ai-progress-success - Success/completed color
 * @cssprop --ai-progress-error - Error state color
 *
 * @example
 * ```html
 * <ai-progress-indicator
 *   .steps=${[
 *     { id: '1', label: 'Analyzing', status: 'completed' },
 *     { id: '2', label: 'Processing', status: 'active' },
 *     { id: '3', label: 'Generating', status: 'pending' }
 *   ]}
 *   currentStep="1"
 *   showEta
 *   cancellable
 * ></ai-progress-indicator>
 * ```
 *
 * @accessibility
 * - Uses role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax
 * - Live region for status updates
 * - Keyboard accessible cancel button
 * - Clear visual distinction between states
 * - Screen reader announces step changes
 *
 * @research
 * - IBM Carbon for AI (2024): AI loading and progress patterns
 *   https://carbondesignsystem.com/guidelines/carbon-for-ai/
 * - PatternFly AI Guidelines (2024): Multi-step AI workflow visualization
 *   https://www.patternfly.org/patternfly-ai/ai-guidelines/
 * - Microsoft HAX Guideline #4: Show progress and time estimates
 *   https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 * - WAI-ARIA Progressbar Pattern
 *   https://www.w3.org/WAI/ARIA/apg/patterns/meter/
 */
@customElement('ai-progress-indicator')
export class AIProgressIndicator extends LitElement {
  @property({ type: Array }) steps: ProgressStep[] = [];
  @property({ type: Number }) currentStep = 0;
  @property({ type: Boolean }) cancellable = false;
  @property({ type: Boolean }) showEta = false;
  @property({ type: String }) variant: 'linear' | 'circular' | 'steps' = 'steps';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) statusMessage = '';

  @state() private _intervalId?: number;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --_progress-primary: var(--ai-progress-primary, #6366f1);
      --_progress-bg: var(--ai-progress-bg, #f1f5f9);
      --_progress-success: var(--ai-progress-success, #10b981);
      --_progress-error: var(--ai-progress-error, #ef4444);
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    }

    .container {
      padding: 1.25rem;
    }

    /* Steps variant */
    .steps-container {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
      z-index: 1;
    }

    .step-indicator {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.8125rem;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    :host([size='small']) .step-indicator {
      width: 2.25rem;
      height: 2.25rem;
      font-size: 0.75rem;
    }

    :host([size='large']) .step-indicator {
      width: 3.25rem;
      height: 3.25rem;
      font-size: 0.9375rem;
    }

    .step-indicator--pending {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      color: #94a3b8;
      border: 2px solid #e2e8f0;
    }

    .step-indicator--active {
      background: var(--_ai-gradient);
      color: white;
      border: none;
      animation: step-pulse 2s ease-in-out infinite;
      box-shadow:
        0 4px 12px rgba(99, 102, 241, 0.3),
        0 0 24px rgba(139, 92, 246, 0.2);
    }

    .step-indicator--completed {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      border: none;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
    }

    .step-indicator--error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
      border: none;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
    }

    @keyframes step-pulse {
      0%,
      100% {
        box-shadow:
          0 4px 12px rgba(99, 102, 241, 0.3),
          0 0 0 0 rgba(139, 92, 246, 0.4);
      }
      50% {
        box-shadow:
          0 4px 16px rgba(99, 102, 241, 0.4),
          0 0 0 10px rgba(139, 92, 246, 0);
      }
    }

    .step-content {
      margin-top: 0.875rem;
      text-align: center;
      max-width: 130px;
    }

    .step-label {
      font-weight: 600;
      font-size: 0.8125rem;
      color: #475569;
      margin-bottom: 0.25rem;
      letter-spacing: -0.01em;
    }

    .step-label--active {
      color: #6366f1;
    }

    .step-label--completed {
      color: #059669;
    }

    .step-label--error {
      color: #dc2626;
    }

    .step-description {
      font-size: 0.6875rem;
      color: #94a3b8;
      line-height: 1.4;
    }

    /* Connector line between steps */
    .connector {
      position: absolute;
      top: 1.375rem;
      left: calc(50% + 1.375rem);
      right: calc(-50% + 1.375rem);
      height: 3px;
      background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 100%);
      z-index: 0;
      border-radius: 9999px;
    }

    :host([size='small']) .connector {
      top: 1.125rem;
      left: calc(50% + 1.125rem);
      right: calc(-50% + 1.125rem);
      height: 2px;
    }

    :host([size='large']) .connector {
      top: 1.625rem;
      left: calc(50% + 1.625rem);
      right: calc(-50% + 1.625rem);
      height: 4px;
    }

    .connector--completed {
      background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.2);
    }

    .connector--active {
      background: linear-gradient(90deg, #10b981 0%, #6366f1 50%, #8b5cf6 100%);
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
    }

    /* Linear variant */
    .linear-container {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }

    .progress-track {
      height: 10px;
      background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 100%);
      border-radius: 9999px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    :host([size='small']) .progress-track {
      height: 6px;
    }

    :host([size='large']) .progress-track {
      height: 14px;
    }

    .progress-fill {
      height: 100%;
      background: var(--_ai-gradient);
      border-radius: 9999px;
      transition: width 600ms cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 16px rgba(99, 102, 241, 0.3);
      position: relative;
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
      );
      animation: shimmer 2s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .progress-fill--complete {
      background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.3);
    }

    .progress-fill--error {
      background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
      box-shadow: 0 0 16px rgba(239, 68, 68, 0.3);
    }

    /* Circular variant */
    .circular-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }

    .circular-progress {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
    }

    .circular-progress--small {
      width: 72px;
      height: 72px;
    }

    .circular-progress--medium {
      width: 108px;
      height: 108px;
    }

    .circular-progress--large {
      width: 144px;
      height: 144px;
    }

    .circular-progress svg {
      transform: rotate(-90deg);
    }

    .circle-bg {
      fill: none;
      stroke: #f1f5f9;
    }

    .circle-fill {
      fill: none;
      stroke: url(#ai-gradient);
      stroke-linecap: round;
      transition: stroke-dashoffset 700ms cubic-bezier(0.4, 0, 0.2, 1);
      filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.4));
    }

    .circle-fill--complete {
      stroke: #10b981;
      filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));
    }

    .circle-fill--error {
      stroke: #ef4444;
      filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.4));
    }

    .circular-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .circular-percentage {
      font-weight: 800;
      font-size: 1.5rem;
      background: var(--_ai-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-variant-numeric: tabular-nums;
    }

    .circular-label {
      font-size: 0.6875rem;
      color: #64748b;
      font-weight: 500;
      margin-top: 0.125rem;
    }

    /* Status and meta info */
    .status-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid #f1f5f9;
    }

    .status-message {
      font-size: 0.8125rem;
      color: #475569;
      display: flex;
      align-items: center;
      gap: 0.625rem;
      font-weight: 500;
    }

    .status-icon {
      width: 1.125rem;
      height: 1.125rem;
      color: #8b5cf6;
      animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .eta-display {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }

    .cancel-button {
      padding: 0.5rem 1rem;
      border: 1.5px solid #e2e8f0;
      background: white;
      border-radius: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      color: #64748b;
    }

    .cancel-button:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #475569;
      transform: translateY(-1px);
    }

    .cancel-button:active {
      transform: translateY(0);
    }

    .cancel-button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    /* AI styling */
    .ai-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4375rem;
      padding: 0.3125rem 0.625rem;
      background: var(--_ai-gradient);
      color: white;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      border-radius: 9999px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
      text-transform: uppercase;
    }

    .ai-icon {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this._startTimer();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopTimer();
  }

  private _startTimer() {
    this._intervalId = window.setInterval(() => {
      // Update timestamp for potential ETA recalculations
      this.requestUpdate();
    }, 1000);
  }

  private _stopTimer() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  private _getProgressPercentage(): number {
    if (this.steps.length === 0) return 0;
    const completedSteps = this.steps.filter(s => s.status === 'completed').length;
    return Math.round((completedSteps / this.steps.length) * 100);
  }

  private _getEta(): string {
    const completedSteps = this.steps.filter(s => s.status === 'completed').length;
    const remainingSteps = this.steps.slice(completedSteps);
    const totalEstimate = remainingSteps.reduce(
      (sum, step) => sum + (step.estimatedDuration || 30),
      0
    );

    if (totalEstimate < 60) {
      return `~${totalEstimate}s remaining`;
    }
    const minutes = Math.ceil(totalEstimate / 60);
    return `~${minutes}m remaining`;
  }

  private _handleCancel() {
    this._stopTimer();
    this.dispatchEvent(
      new CustomEvent('cancel', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderStepIcon(step: ProgressStep, index: number) {
    if (step.status === 'completed') {
      return html`<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
        />
      </svg>`;
    }
    if (step.status === 'error') {
      return html`<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M4.47 4.47a.75.75 0 011.06 0L8 6.94l2.47-2.47a.75.75 0 111.06 1.06L9.06 8l2.47 2.47a.75.75 0 11-1.06 1.06L8 9.06l-2.47 2.47a.75.75 0 01-1.06-1.06L6.94 8 4.47 5.53a.75.75 0 010-1.06z"
        />
      </svg>`;
    }
    if (step.status === 'active') {
      return html`<svg class="status-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-dasharray="28" />
      </svg>`;
    }
    return index + 1;
  }

  private _renderStepsVariant(): TemplateResult {
    return html`
      <div class="steps-container" part="steps">
        ${this.steps.map(
          (step, index) => html`
            <div class="step" part="step">
              <div class="step-indicator step-indicator--${step.status}" part="step-indicator">
                ${this._renderStepIcon(step, index)}
              </div>
              <div class="step-content">
                <div class="step-label step-label--${step.status}">${step.label}</div>
                ${step.description
                  ? html`<div class="step-description">${step.description}</div>`
                  : ''}
              </div>
              ${index < this.steps.length - 1
                ? html`
                    <div
                      class="connector ${step.status === 'completed'
                        ? 'connector--completed'
                        : step.status === 'active'
                          ? 'connector--active'
                          : ''}"
                    ></div>
                  `
                : ''}
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderLinearVariant(): TemplateResult {
    const percentage = this._getProgressPercentage();
    const hasError = this.steps.some(s => s.status === 'error');
    const isComplete = percentage === 100;

    return html`
      <div class="linear-container" part="linear">
        <div
          class="progress-track"
          part="progress-bar"
          role="progressbar"
          aria-valuenow=${percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="AI processing progress"
        >
          <div
            class="progress-fill ${isComplete
              ? 'progress-fill--complete'
              : hasError
                ? 'progress-fill--error'
                : ''}"
            part="progress-fill"
            style="width: ${percentage}%"
          ></div>
        </div>
        <div
          style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6b7280;"
        >
          <span>${this.steps[this.currentStep]?.label || 'Processing...'}</span>
          <span>${percentage}%</span>
        </div>
      </div>
    `;
  }

  private _renderCircularVariant(): TemplateResult {
    const percentage = this._getProgressPercentage();
    const size = this.size === 'small' ? 64 : this.size === 'large' ? 128 : 96;
    const strokeWidth = this.size === 'small' ? 4 : this.size === 'large' ? 8 : 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    const hasError = this.steps.some(s => s.status === 'error');
    const isComplete = percentage === 100;

    return html`
      <div class="circular-container" part="circular">
        <div
          class="circular-progress circular-progress--${this.size}"
          role="progressbar"
          aria-valuenow=${percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="AI processing progress"
        >
          <svg width=${size} height=${size}>
            <circle
              class="circle-bg"
              cx=${size / 2}
              cy=${size / 2}
              r=${radius}
              stroke-width=${strokeWidth}
            />
            <circle
              class="circle-fill ${isComplete
                ? 'circle-fill--complete'
                : hasError
                  ? 'circle-fill--error'
                  : ''}"
              cx=${size / 2}
              cy=${size / 2}
              r=${radius}
              stroke-width=${strokeWidth}
              stroke-dasharray=${circumference}
              stroke-dashoffset=${offset}
            />
          </svg>
          <div class="circular-content">
            <span class="circular-percentage">${percentage}%</span>
            <span class="circular-label">${this.steps[this.currentStep]?.label || ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  render(): TemplateResult {
    const hasError = this.steps.some(s => s.status === 'error');
    const isComplete = this._getProgressPercentage() === 100;

    return html`
      <div class="container" part="container">
        <slot name="header"></slot>

        <div class="ai-badge">
          <svg class="ai-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
          AI Processing
        </div>

        ${this.variant === 'steps'
          ? this._renderStepsVariant()
          : this.variant === 'linear'
            ? this._renderLinearVariant()
            : this._renderCircularVariant()}

        <div
          class="status-container"
          part="status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div class="status-message">
            ${!isComplete && !hasError
              ? html`<svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke-width="2" stroke-dasharray="50" />
                </svg>`
              : ''}
            <span
              >${this.statusMessage || this.steps[this.currentStep]?.label || 'Processing...'}</span
            >
          </div>

          <div style="display: flex; align-items: center; gap: 1rem;">
            ${this.showEta && !isComplete && !hasError
              ? html`<span class="eta-display" part="eta">${this._getEta()}</span>`
              : ''}
            ${this.cancellable && !isComplete && !hasError
              ? html`
                  <button
                    class="cancel-button"
                    @click=${this._handleCancel}
                    aria-label="Cancel AI operation"
                  >
                    Cancel
                  </button>
                `
              : ''}
          </div>
        </div>

        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-progress-indicator': AIProgressIndicator;
  }
}
