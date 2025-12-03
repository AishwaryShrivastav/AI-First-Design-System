import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Tooltip placement options
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * AI Tooltip Component
 *
 * Contextual tooltip component optimized for AI explanations and guidance.
 * Supports rich content, AI-specific styling, progressive disclosure,
 * and interaction tracking for AI help systems.
 *
 * @element ai-tooltip
 *
 * @fires show - Dispatched when tooltip becomes visible
 * @fires hide - Dispatched when tooltip is hidden
 * @fires interaction - Dispatched when user interacts with tooltip content
 *
 * @prop {string} content - Tooltip text content
 * @prop {TooltipPlacement} placement - Preferred placement
 * @prop {boolean} visible - Manually control visibility
 * @prop {string} trigger - Trigger type (hover, click, focus, manual)
 * @prop {number} delay - Show delay in ms
 * @prop {boolean} aiExplanation - Style as AI explanation tooltip
 * @prop {string} learnMoreUrl - Optional URL for "Learn More" link
 * @prop {boolean} dismissible - Show dismiss button
 * @prop {number} maxWidth - Maximum width in pixels
 *
 * @slot - Trigger element
 * @slot content - Custom rich content
 *
 * @csspart trigger - Trigger wrapper
 * @csspart tooltip - Tooltip container
 * @csspart arrow - Arrow element
 * @csspart content - Content wrapper
 *
 * @cssprop --ai-tooltip-bg - Background color
 * @cssprop --ai-tooltip-color - Text color
 * @cssprop --ai-tooltip-radius - Border radius
 * @cssprop --ai-tooltip-padding - Content padding
 * @cssprop --ai-tooltip-shadow - Box shadow
 *
 * @example
 * ```html
 * <ai-tooltip
 *   content="AI analyzed your preferences to suggest this option"
 *   aiExplanation
 *   placement="top"
 * >
 *   <ai-button>AI Suggested</ai-button>
 * </ai-tooltip>
 * ```
 *
 * @accessibility
 * - role="tooltip" with proper ARIA relationships
 * - aria-describedby linking to tooltip content
 * - Keyboard accessible (focus trigger)
 * - Escape key dismisses tooltip
 * - Proper focus management for interactive tooltips
 * - Screen reader compatible
 *
 * @research
 * - WAI-ARIA Tooltip Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 * - IBM Carbon Tooltip (2024): Design patterns
 *   https://carbondesignsystem.com/components/tooltip/usage/
 * - Microsoft HAX Guideline #7: Explain AI decisions
 *   https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 * - SAP Fiori Explainable AI: Contextual explanations
 *   https://experience.sap.com/fiori-design-web/explainable-ai/
 */
@customElement('ai-tooltip')
export class AITooltip extends LitElement {
  @property({ type: String }) content = '';
  @property({ type: String }) placement: TooltipPlacement = 'top';
  @property({ type: Boolean }) visible = false;
  @property({ type: String }) trigger: 'hover' | 'click' | 'focus' | 'manual' = 'hover';
  @property({ type: Number }) delay = 200;
  @property({ type: Boolean }) aiExplanation = false;
  @property({ type: String }) learnMoreUrl = '';
  @property({ type: Boolean }) dismissible = false;
  @property({ type: Number }) maxWidth = 280;

  @state() private _isVisible = false;
  @state() private _tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  private _showTimeout?: number;
  private _hideTimeout?: number;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    }

    .trigger-wrapper {
      display: inline-block;
    }

    .tooltip {
      position: absolute;
      z-index: 1000;
      padding: var(--ai-tooltip-padding, 0.875rem 1rem);
      background: var(--ai-tooltip-bg, rgba(15, 23, 42, 0.95));
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: var(--ai-tooltip-color, #f8fafc);
      border-radius: var(--ai-tooltip-radius, 0.75rem);
      box-shadow: var(
        --ai-tooltip-shadow,
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 10px 20px rgba(0, 0, 0, 0.15),
        0 20px 40px rgba(0, 0, 0, 0.1)
      );
      font-size: 0.8125rem;
      line-height: 1.6;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .tooltip--visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .tooltip--ai {
      background: linear-gradient(135deg, rgba(30, 27, 75, 0.98) 0%, rgba(49, 46, 129, 0.98) 100%);
      border: 1px solid rgba(139, 92, 246, 0.25);
      box-shadow:
        0 4px 6px rgba(99, 102, 241, 0.1),
        0 10px 20px rgba(139, 92, 246, 0.15),
        0 0 40px rgba(139, 92, 246, 0.1);
    }

    /* Placement with smooth animations */
    .tooltip--top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-12px) scale(0.96);
    }

    .tooltip--top.tooltip--visible {
      transform: translateX(-50%) translateY(-10px) scale(1);
    }

    .tooltip--bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(12px) scale(0.96);
    }

    .tooltip--bottom.tooltip--visible {
      transform: translateX(-50%) translateY(10px) scale(1);
    }

    .tooltip--left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(-12px) scale(0.96);
    }

    .tooltip--left.tooltip--visible {
      transform: translateY(-50%) translateX(-10px) scale(1);
    }

    .tooltip--right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(12px) scale(0.96);
    }

    .tooltip--right.tooltip--visible {
      transform: translateY(-50%) translateX(10px) scale(1);
    }

    /* Arrow with gradient border effect */
    .arrow {
      position: absolute;
      width: 10px;
      height: 10px;
      background: inherit;
      transform: rotate(45deg);
      border: inherit;
    }

    .tooltip--top .arrow {
      bottom: -5px;
      left: 50%;
      margin-left: -5px;
      border-top: none;
      border-left: none;
    }

    .tooltip--bottom .arrow {
      top: -5px;
      left: 50%;
      margin-left: -5px;
      border-bottom: none;
      border-right: none;
    }

    .tooltip--left .arrow {
      right: -5px;
      top: 50%;
      margin-top: -5px;
      border-bottom: none;
      border-left: none;
    }

    .tooltip--right .arrow {
      left: -5px;
      top: 50%;
      margin-top: -5px;
      border-top: none;
      border-right: none;
    }

    /* Content */
    .content-wrapper {
      position: relative;
    }

    /* AI header */
    .ai-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.625rem;
      padding-bottom: 0.625rem;
      border-bottom: 1px solid rgba(139, 92, 246, 0.2);
    }

    .ai-icon {
      width: 1.125rem;
      height: 1.125rem;
      padding: 0.1875rem;
      background: var(--_ai-gradient);
      border-radius: 0.3125rem;
      color: white;
      box-shadow: 0 2px 6px rgba(139, 92, 246, 0.4);
    }

    .ai-label {
      font-size: 0.625rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: var(--_ai-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .tooltip-text {
      margin: 0;
      color: rgba(248, 250, 252, 0.9);
    }

    /* Actions */
    .tooltip-actions {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      margin-top: 0.75rem;
      padding-top: 0.625rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .learn-more {
      font-size: 0.75rem;
      font-weight: 500;
      color: #a5b4fc;
      text-decoration: none;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .learn-more:hover {
      color: white;
    }

    .dismiss-btn {
      margin-left: auto;
      padding: 0.3125rem;
      background: rgba(255, 255, 255, 0.05);
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
      transition: all 0.15s ease;
    }

    .dismiss-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .dismiss-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(165, 180, 252, 0.5);
    }

    .dismiss-icon {
      width: 0.875rem;
      height: 0.875rem;
      display: block;
    }

    /* Helper icon for AI explanation trigger */
    .ai-help-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.125rem;
      height: 1.125rem;
      margin-left: 0.375rem;
      background: var(--_ai-gradient);
      border-radius: 50%;
      cursor: help;
      vertical-align: middle;
      box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
      transition: all 0.15s ease;
    }

    .ai-help-icon:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    }

    .ai-help-icon svg {
      width: 0.625rem;
      height: 0.625rem;
      color: white;
    }

    /* Interactive tooltip styles */
    .tooltip--interactive {
      pointer-events: auto;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this._setupKeyboardHandler();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearTimeouts();
  }

  private _setupKeyboardHandler() {
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this._isVisible) {
        this._hide();
      }
    });
  }

  private _clearTimeouts() {
    if (this._showTimeout) clearTimeout(this._showTimeout);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  }

  private _show() {
    this._clearTimeouts();
    this._showTimeout = window.setTimeout(() => {
      this._isVisible = true;
      this.dispatchEvent(
        new CustomEvent('show', {
          bubbles: true,
          composed: true,
        })
      );
    }, this.delay);
  }

  private _hide() {
    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => {
      this._isVisible = false;
      this.dispatchEvent(
        new CustomEvent('hide', {
          bubbles: true,
          composed: true,
        })
      );
    }, 100);
  }

  private _handleTriggerEnter() {
    if (this.trigger === 'hover') {
      this._show();
    }
  }

  private _handleTriggerLeave() {
    if (this.trigger === 'hover') {
      this._hide();
    }
  }

  private _handleTriggerClick() {
    if (this.trigger === 'click') {
      this._isVisible ? this._hide() : this._show();
    }
  }

  private _handleTriggerFocus() {
    if (this.trigger === 'focus' || this.trigger === 'hover') {
      this._show();
    }
  }

  private _handleTriggerBlur() {
    if (this.trigger === 'focus' || this.trigger === 'hover') {
      this._hide();
    }
  }

  private _handleTooltipEnter() {
    if (this.trigger === 'hover' && (this.learnMoreUrl || this.dismissible)) {
      this._clearTimeouts();
    }
  }

  private _handleTooltipLeave() {
    if (this.trigger === 'hover') {
      this._hide();
    }
  }

  private _handleDismiss() {
    this._hide();
    this.dispatchEvent(
      new CustomEvent('interaction', {
        bubbles: true,
        composed: true,
        detail: { action: 'dismiss' },
      })
    );
  }

  private _handleLearnMore() {
    this.dispatchEvent(
      new CustomEvent('interaction', {
        bubbles: true,
        composed: true,
        detail: { action: 'learn-more', url: this.learnMoreUrl },
      })
    );
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('visible')) {
      this._isVisible = this.visible;
    }
  }

  render(): TemplateResult {
    const showTooltip = this._isVisible || this.visible;
    const isInteractive = this.learnMoreUrl || this.dismissible;

    return html`
      <div
        class="trigger-wrapper"
        part="trigger"
        @mouseenter=${this._handleTriggerEnter}
        @mouseleave=${this._handleTriggerLeave}
        @click=${this._handleTriggerClick}
        @focus=${this._handleTriggerFocus}
        @blur=${this._handleTriggerBlur}
        aria-describedby=${this._tooltipId}
      >
        <slot></slot>
      </div>

      <div
        id=${this._tooltipId}
        class="tooltip tooltip--${this.placement} ${showTooltip ? 'tooltip--visible' : ''} ${this
          .aiExplanation
          ? 'tooltip--ai'
          : ''} ${isInteractive ? 'tooltip--interactive' : ''}"
        part="tooltip"
        role="tooltip"
        aria-hidden=${!showTooltip}
        style="max-width: ${this.maxWidth}px"
        @mouseenter=${this._handleTooltipEnter}
        @mouseleave=${this._handleTooltipLeave}
      >
        <div class="arrow" part="arrow"></div>

        <div class="content-wrapper" part="content">
          ${this.aiExplanation
            ? html`
                <div class="ai-header">
                  <svg class="ai-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                    />
                  </svg>
                  <span class="ai-label">AI Explanation</span>
                </div>
              `
            : ''}

          <slot name="content">
            <p class="tooltip-text">${this.content}</p>
          </slot>

          ${this.learnMoreUrl || this.dismissible
            ? html`
                <div class="tooltip-actions">
                  ${this.learnMoreUrl
                    ? html`
                        <a
                          class="learn-more"
                          href=${this.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          @click=${this._handleLearnMore}
                        >
                          Learn more →
                        </a>
                      `
                    : ''}
                  ${this.dismissible
                    ? html`
                        <button
                          class="dismiss-btn"
                          @click=${this._handleDismiss}
                          aria-label="Dismiss tooltip"
                        >
                          <svg class="dismiss-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      `
                    : ''}
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-tooltip': AITooltip;
  }
}
