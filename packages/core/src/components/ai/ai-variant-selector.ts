import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * AI Variant Selector Component
 *
 * Enables users to explore generative variability by displaying multiple
 * AI-generated options and allowing preference-based regeneration.
 *
 * @element ai-variant-selector
 *
 * @fires variant-selected - Dispatched when user selects a variant
 * @fires regenerate - Dispatched when user requests regeneration with preferences
 * @fires compare - Dispatched when user compares variants
 *
 * @prop {Array} variants - Array of AI-generated variant options
 * @prop {boolean} showPreferences - Show preference controls for regeneration
 * @prop {boolean} allowCompare - Enable variant comparison view
 *
 * @example
 * ```html
 * <ai-variant-selector
 *   .variants=${[...]}
 *   showPreferences
 *   allowCompare
 * ></ai-variant-selector>
 * ```
 *
 * @accessibility
 * - Keyboard navigation between variants
 * - ARIA labels for variant selection
 * - Screen reader announces variant count
 *
 * @research
 * - Google AI UX Patterns (2024): Generative variability
 * - shapeof.ai: Exploration patterns in generative AI
 * - Microsoft HAX #10: User control over AI outputs
 */
@customElement('ai-variant-selector')
export class AIVariantSelector extends LitElement {
  @property({ type: Array }) variants: Array<{
    id: string;
    content: string;
    confidence?: number;
    attributes?: Record<string, string>;
  }> = [];

  @property({ type: Boolean }) showPreferences = false;
  @property({ type: Boolean }) allowCompare = false;

  @state() private _selectedVariantId: string | null = null;
  @state() private _compareMode = false;
  @state() private _preferences = {
    tone: 'balanced',
    length: 'medium',
    style: 'standard',
  };

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .container {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: white;
    }

    .header {
      padding: 1rem;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-weight: 600;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .variant-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.5rem;
      height: 1.5rem;
      padding: 0 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .header-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-button {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: white;
      color: #374151;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 150ms;
    }

    .action-button:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .action-button--primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
    }

    .action-button--primary:hover {
      opacity: 0.9;
    }

    .variants-container {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .variant-card {
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 150ms;
      position: relative;
    }

    .variant-card:hover {
      border-color: #667eea;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .variant-card--selected {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }

    .variant-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .variant-label {
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .confidence-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .confidence-high {
      background: #dcfce7;
      color: #166534;
    }

    .confidence-medium {
      background: #fef3c7;
      color: #92400e;
    }

    .confidence-low {
      background: #fee2e2;
      color: #991b1b;
    }

    .variant-content {
      color: #111827;
      line-height: 1.6;
      margin-bottom: 0.75rem;
    }

    .variant-attributes {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .attribute-tag {
      padding: 0.25rem 0.5rem;
      background: #f3f4f6;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .preferences-panel {
      padding: 1rem;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }

    .preferences-title {
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.75rem;
    }

    .preference-controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .preference-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .preference-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    select {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: white;
      color: #111827;
      font-size: 0.875rem;
      cursor: pointer;
    }

    select:focus {
      outline: 2px solid #667eea;
      outline-offset: 0;
    }

    .compare-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }
  `;

  private _getConfidenceClass(confidence?: number): string {
    if (!confidence) return '';
    if (confidence >= 0.8) return 'confidence-high';
    if (confidence >= 0.5) return 'confidence-medium';
    return 'confidence-low';
  }

  private _getConfidenceLabel(confidence?: number): string {
    if (!confidence) return '';
    if (confidence >= 0.8) return `${Math.round(confidence * 100)}% Confident`;
    if (confidence >= 0.5) return `${Math.round(confidence * 100)}% Confident`;
    return `${Math.round(confidence * 100)}% Confident`;
  }

  private _handleVariantSelect(variantId: string) {
    this._selectedVariantId = variantId;
    const variant = this.variants.find(v => v.id === variantId);

    this.dispatchEvent(
      new CustomEvent('variant-selected', {
        bubbles: true,
        composed: true,
        detail: { variant },
      })
    );
  }

  private _handleRegenerate() {
    this.dispatchEvent(
      new CustomEvent('regenerate', {
        bubbles: true,
        composed: true,
        detail: { preferences: this._preferences },
      })
    );
  }

  private _toggleCompareMode() {
    this._compareMode = !this._compareMode;

    if (this._compareMode) {
      this.dispatchEvent(
        new CustomEvent('compare', {
          bubbles: true,
          composed: true,
          detail: { variants: this.variants },
        })
      );
    }
  }

  render(): TemplateResult {
    return html`
      <div class="container" part="container">
        <div class="header">
          <div class="title">
            <span>AI Generated Variants</span>
            <span class="variant-count" aria-label="${this.variants.length} variants"
              >${this.variants.length}</span
            >
          </div>
          <div class="header-actions">
            ${this.allowCompare
              ? html`
                  <button class="action-button" @click=${this._toggleCompareMode}>
                    ${this._compareMode ? 'List View' : 'Compare'}
                  </button>
                `
              : ''}
            <button class="action-button action-button--primary" @click=${this._handleRegenerate}>
              Generate Again
            </button>
          </div>
        </div>

        <div class="variants-container ${this._compareMode ? 'compare-view' : ''}" part="variants">
          ${this.variants.map(
            variant => html`
              <div
                class="variant-card ${this._selectedVariantId === variant.id
                  ? 'variant-card--selected'
                  : ''}"
                role="button"
                tabindex="0"
                @click=${() => this._handleVariantSelect(variant.id)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this._handleVariantSelect(variant.id);
                  }
                }}
              >
                <div class="variant-header">
                  <span class="variant-label">Option ${this.variants.indexOf(variant) + 1}</span>
                  ${variant.confidence !== undefined
                    ? html`
                        <span
                          class="confidence-badge ${this._getConfidenceClass(variant.confidence)}"
                        >
                          ${this._getConfidenceLabel(variant.confidence)}
                        </span>
                      `
                    : ''}
                </div>
                <div class="variant-content">${variant.content}</div>
                ${variant.attributes
                  ? html`
                      <div class="variant-attributes">
                        ${Object.entries(variant.attributes).map(
                          ([key, value]) => html`
                            <span class="attribute-tag">${key}: ${value}</span>
                          `
                        )}
                      </div>
                    `
                  : ''}
              </div>
            `
          )}
        </div>

        ${this.showPreferences
          ? html`
              <div class="preferences-panel" part="preferences">
                <div class="preferences-title">Regeneration Preferences</div>
                <div class="preference-controls">
                  <div class="preference-group">
                    <label class="preference-label" for="tone">Tone</label>
                    <select
                      id="tone"
                      @change=${(e: Event) => {
                        this._preferences.tone = (e.target as HTMLSelectElement).value;
                      }}
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="balanced" selected>Balanced</option>
                      <option value="friendly">Friendly</option>
                    </select>
                  </div>
                  <div class="preference-group">
                    <label class="preference-label" for="length">Length</label>
                    <select
                      id="length"
                      @change=${(e: Event) => {
                        this._preferences.length = (e.target as HTMLSelectElement).value;
                      }}
                    >
                      <option value="concise">Concise</option>
                      <option value="medium" selected>Medium</option>
                      <option value="detailed">Detailed</option>
                    </select>
                  </div>
                  <div class="preference-group">
                    <label class="preference-label" for="style">Style</label>
                    <select
                      id="style"
                      @change=${(e: Event) => {
                        this._preferences.style = (e.target as HTMLSelectElement).value;
                      }}
                    >
                      <option value="standard" selected>Standard</option>
                      <option value="creative">Creative</option>
                      <option value="technical">Technical</option>
                    </select>
                  </div>
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-variant-selector': AIVariantSelector;
  }
}
