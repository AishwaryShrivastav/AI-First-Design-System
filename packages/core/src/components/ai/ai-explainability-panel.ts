import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ExplainabilityLevel } from '../../utils/types';

/**
 * AI explainability panel with progressive disclosure (What/Why/How).
 *
 * @element ai-explainability-panel
 *
 * @fires level-change - Dispatched when explainability level changes
 *
 * @slot what - High-level explanation (always visible)
 * @slot why - Reasoning explanation (shown at 'why' level)
 * @slot how - Technical details (shown at 'how' level)
 *
 * @cssprop --ai-explain-bg - Background color
 * @cssprop --ai-explain-border - Border style
 *
 * @prop {ExplainabilityLevel} level - Current disclosure level
 * @prop {boolean} collapsible - Allow collapse/expand
 * @prop {boolean} collapsed - Initial collapsed state
 *
 * @example
 * ```html
 * <ai-explainability-panel level="why">
 *   <div slot="what">This action was recommended</div>
 *   <div slot="why">Based on your usage patterns</div>
 *   <div slot="how">ML Model: RandomForest, Confidence: 94%</div>
 * </ai-explainability-panel>
 * ```
 *
 * @accessibility
 * - Keyboard navigation
 * - ARIA expanded state
 * - Clear headings for each level
 *
 * @reference
 * - SAP Fiori Explainable AI: https://experience.sap.com/fiori-design-web/explainable-ai/
 * - Microsoft HAX Guideline #7: https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 */
@customElement('ai-explainability-panel')
export class AIExplainabilityPanel extends LitElement {
  @property({ type: String }) level: ExplainabilityLevel = 'what';
  @property({ type: Boolean }) collapsible = true;
  @property({ type: Boolean }) collapsed = false;

  @state() private _expanded = true;

  static styles = css`
    :host {
      display: block;
    }

    .panel {
      border: var(--ai-explain-border, 1px solid #e5e7eb);
      border-radius: 0.5rem;
      background: var(--ai-explain-bg, white);
      overflow: hidden;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .panel-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      color: #1f2937;
    }

    .ai-icon {
      width: 1.25rem;
      height: 1.25rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.75rem;
    }

    .toggle-button {
      padding: 0.375rem;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 150ms ease;
    }

    .toggle-button:hover {
      background: #f3f4f6;
      color: #1f2937;
    }

    .toggle-button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .panel-content {
      padding: 1rem;
    }

    .level-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .level-tab {
      padding: 0.5rem 1rem;
      border: none;
      background: transparent;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      font-weight: 500;
      color: #6b7280;
      transition: all 150ms ease;
    }

    .level-tab:hover {
      color: #1f2937;
    }

    .level-tab--active {
      color: #3b82f6;
      border-bottom-color: #3b82f6;
    }

    .level-tab:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: -2px;
    }

    .explanation-section {
      padding: 0.75rem 0;
    }

    .explanation-section + .explanation-section {
      border-top: 1px solid #f3f4f6;
    }

    .section-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .section-content {
      color: #6b7280;
      line-height: 1.6;
    }

    .collapsed {
      display: none;
    }
  `;

  private _handleToggle() {
    this._expanded = !this._expanded;
  }

  private _handleLevelChange(newLevel: ExplainabilityLevel) {
    this.level = newLevel;
    this.dispatchEvent(
      new CustomEvent('level-change', {
        bubbles: true,
        composed: true,
        detail: { level: newLevel },
      })
    );
  }

  render() {
    const showContent = !this.collapsed || this._expanded;

    return html`
      <div class="panel" part="panel">
        <div class="panel-header" part="header">
          <div class="panel-title">
            <span class="ai-icon">💡</span>
            <span>AI Explanation</span>
          </div>
          ${this.collapsible
            ? html`
                <button
                  class="toggle-button"
                  @click=${this._handleToggle}
                  aria-expanded=${this._expanded}
                  aria-label=${this._expanded ? 'Collapse' : 'Expand'}
                >
                  ${this._expanded ? '▼' : '▶'}
                </button>
              `
            : ''}
        </div>

        <div class="panel-content ${showContent ? '' : 'collapsed'}" part="content">
          <div class="level-tabs" role="tablist">
            <button
              class="level-tab ${this.level === 'what' ? 'level-tab--active' : ''}"
              role="tab"
              aria-selected=${this.level === 'what'}
              @click=${() => this._handleLevelChange('what')}
            >
              What
            </button>
            <button
              class="level-tab ${this.level === 'why' ? 'level-tab--active' : ''}"
              role="tab"
              aria-selected=${this.level === 'why'}
              @click=${() => this._handleLevelChange('why')}
            >
              Why
            </button>
            <button
              class="level-tab ${this.level === 'how' ? 'level-tab--active' : ''}"
              role="tab"
              aria-selected=${this.level === 'how'}
              @click=${() => this._handleLevelChange('how')}
            >
              How
            </button>
          </div>

          <div class="explanation-section" role="tabpanel">
            <div class="section-title">What happened?</div>
            <div class="section-content">
              <slot name="what"></slot>
            </div>
          </div>

          ${this.level === 'why' || this.level === 'how'
            ? html`
                <div class="explanation-section" role="tabpanel">
                  <div class="section-title">Why did this happen?</div>
                  <div class="section-content">
                    <slot name="why"></slot>
                  </div>
                </div>
              `
            : ''}
          ${this.level === 'how'
            ? html`
                <div class="explanation-section" role="tabpanel">
                  <div class="section-title">How does it work?</div>
                  <div class="section-content">
                    <slot name="how"></slot>
                  </div>
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
    'ai-explainability-panel': AIExplainabilityPanel;
  }
}
