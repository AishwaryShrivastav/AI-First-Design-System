import { LitElement, html, css, TemplateResult } from 'lit';
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
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    }

    .panel {
      border: var(--ai-explain-border, 1.5px solid #e2e8f0);
      border-radius: 1rem;
      background: var(--ai-explain-bg, white);
      overflow: hidden;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.02),
        0 4px 12px rgba(0, 0, 0, 0.03);
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.125rem;
      background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 50%, #f0f9ff 100%);
      border-bottom: 1px solid rgba(139, 92, 246, 0.1);
    }

    .panel-title {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      font-weight: 650;
      font-size: 0.9375rem;
      color: #1e293b;
      letter-spacing: -0.01em;
    }

    .ai-icon {
      width: 1.5rem;
      height: 1.5rem;
      background: var(--_ai-gradient);
      border-radius: 0.4375rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
    }

    .toggle-button {
      padding: 0.4375rem;
      border: none;
      background: rgba(139, 92, 246, 0.08);
      border-radius: 0.5rem;
      cursor: pointer;
      color: #8b5cf6;
      transition: all 0.15s ease;
      font-size: 0.75rem;
    }

    .toggle-button:hover {
      background: rgba(139, 92, 246, 0.15);
      color: #7c3aed;
    }

    .toggle-button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    }

    .panel-content {
      padding: 1.125rem;
    }

    .level-tabs {
      display: flex;
      gap: 0.25rem;
      margin-bottom: 1.125rem;
      padding: 0.25rem;
      background: #f1f5f9;
      border-radius: 0.625rem;
    }

    .level-tab {
      flex: 1;
      padding: 0.5625rem 1rem;
      border: none;
      background: transparent;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.8125rem;
      color: #64748b;
      transition: all 0.2s ease;
    }

    .level-tab:hover {
      color: #475569;
      background: rgba(255, 255, 255, 0.5);
    }

    .level-tab--active {
      color: #6366f1;
      background: white;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.04),
        0 2px 4px rgba(0, 0, 0, 0.04);
    }

    .level-tab:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    .explanation-section {
      padding: 1rem 0;
      animation: section-fade-in 0.3s ease-out;
    }

    @keyframes section-fade-in {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .explanation-section + .explanation-section {
      border-top: 1px solid #f1f5f9;
    }

    .section-title {
      font-weight: 650;
      font-size: 0.8125rem;
      color: #475569;
      margin-bottom: 0.625rem;
      letter-spacing: -0.01em;
    }

    .section-content {
      color: #64748b;
      line-height: 1.65;
      font-size: 0.875rem;
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

  render(): TemplateResult {
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
