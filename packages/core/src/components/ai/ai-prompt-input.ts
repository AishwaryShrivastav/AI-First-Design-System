import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Advanced prompt input component designed for AI interactions.
 *
 * @element ai-prompt-input
 *
 * @fires submit - Dispatched when user submits the prompt
 * @fires change - Dispatched when input value changes
 * @fires template-select - Dispatched when user selects a prompt template
 *
 * @slot prefix - Content before the input
 * @slot suffix - Content after the input
 * @slot templates - Prompt template suggestions
 *
 * @cssprop --ai-prompt-bg - Background color
 * @cssprop --ai-prompt-border - Border style
 * @cssprop --ai-prompt-radius - Border radius
 *
 * @prop {string} value - Current input value
 * @prop {string} placeholder - Placeholder text
 * @prop {boolean} disabled - Whether input is disabled
 * @prop {boolean} loading - Show loading state
 * @prop {boolean} showTokenCount - Show token/character count
 * @prop {number} maxTokens - Maximum tokens allowed
 * @prop {boolean} multiline - Allow multi-line input (auto-expanding)
 * @prop {boolean} showTemplates - Show prompt templates
 *
 * @example
 * ```html
 * <ai-prompt-input
 *   placeholder="Ask anything..."
 *   showTokenCount
 *   maxTokens="4000"
 * ></ai-prompt-input>
 * ```
 *
 * @accessibility
 * - Keyboard shortcuts (Cmd/Ctrl + Enter to submit)
 * - Screen reader support
 * - Focus management
 * - ARIA labels for actions
 *
 * @reference
 * - Modern AI product UX (ChatGPT, Claude, Perplexity)
 * - WAI-ARIA Combobox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */
@customElement('ai-prompt-input')
export class AIPromptInput extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Type your prompt...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) showTokenCount = false;
  @property({ type: Number }) maxTokens = 4000;
  @property({ type: Boolean }) multiline = true;
  @property({ type: Boolean }) showTemplates = false;

  @state() private _focused = false;

  static styles = css`
    :host {
      display: block;
    }

    .prompt-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      border: var(--ai-prompt-border, 2px solid #e5e7eb);
      border-radius: var(--ai-prompt-radius, 0.75rem);
      background: var(--ai-prompt-bg, white);
      transition: all 150ms ease;
    }

    .prompt-wrapper:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    :host([disabled]) .prompt-wrapper {
      opacity: 0.5;
      cursor: not-allowed;
      background: #f3f4f6;
    }

    .input-container {
      display: flex;
      align-items: flex-end;
      gap: 0.75rem;
      padding: 1rem;
    }

    .input-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    textarea {
      width: 100%;
      min-height: 2.5rem;
      max-height: 15rem;
      padding: 0;
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.5;
      resize: none;
      overflow-y: auto;
    }

    textarea:disabled {
      cursor: not-allowed;
    }

    textarea::placeholder {
      color: #9ca3af;
    }

    .input-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .input-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .token-count {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .token-count--warning {
      color: #f59e0b;
    }

    .token-count--error {
      color: #ef4444;
    }

    .action-button {
      padding: 0.5rem;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 150ms ease;
    }

    .action-button:hover:not(:disabled) {
      background: #f3f4f6;
      color: #1f2937;
    }

    .action-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .submit-button {
      padding: 0.625rem 1.25rem;
      border: none;
      border-radius: 0.5rem;
      background: #3b82f6;
      color: white;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 150ms ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .submit-button:hover:not(:disabled) {
      background: #2563eb;
    }

    .submit-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .submit-button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .loading-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .templates {
      padding: 0.75rem 1rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .template-chip {
      padding: 0.375rem 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 9999px;
      font-size: 0.75rem;
      background: white;
      cursor: pointer;
      transition: all 150ms ease;
    }

    .template-chip:hover {
      border-color: #3b82f6;
      background: #eff6ff;
      color: #3b82f6;
    }

    .hint-text {
      padding: 0 1rem 0.75rem;
      font-size: 0.75rem;
      color: #6b7280;
    }
  `;

  private _handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    // Auto-resize textarea
    if (this.multiline) {
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleSubmit() {
    if (!this.value.trim() || this.disabled || this.loading) return;

    this.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    // Cmd/Ctrl + Enter to submit
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this._handleSubmit();
    }
  }

  private _handleTemplateSelect(template: string) {
    this.value = template;
    this.dispatchEvent(
      new CustomEvent('template-select', {
        bubbles: true,
        composed: true,
        detail: { template },
      })
    );
  }

  render(): TemplateResult {
    // Simple token estimation (4 chars ≈ 1 token)
    const estimatedTokens = Math.ceil(this.value.length / 4);
    const tokenPercentage = (estimatedTokens / this.maxTokens) * 100;
    const tokenWarning = tokenPercentage > 80;
    const tokenError = tokenPercentage > 100;

    return html`
      <div class="prompt-wrapper" part="wrapper">
        ${this.showTemplates
          ? html`
              <div class="templates" part="templates">
                <button
                  class="template-chip"
                  @click=${() => this._handleTemplateSelect('Summarize this text...')}
                >
                  📝 Summarize
                </button>
                <button
                  class="template-chip"
                  @click=${() => this._handleTemplateSelect('Explain this concept...')}
                >
                  💡 Explain
                </button>
                <button
                  class="template-chip"
                  @click=${() => this._handleTemplateSelect('Write code to...')}
                >
                  💻 Code
                </button>
                <slot name="templates"></slot>
              </div>
            `
          : ''}

        <div class="input-container">
          <slot name="prefix"></slot>
          <div class="input-wrapper">
            <textarea
              part="input"
              .value=${this.value}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled || this.loading}
              @input=${this._handleInput}
              @keydown=${this._handleKeyDown}
              @focus=${() => (this._focused = true)}
              @blur=${() => (this._focused = false)}
              aria-label="Prompt input"
              aria-describedby=${this.showTokenCount ? 'token-count' : undefined}
            ></textarea>
          </div>
          <slot name="suffix"></slot>
        </div>

        <div class="input-footer" part="footer">
          <div class="input-actions">
            ${this.showTokenCount
              ? html`
                  <span
                    id="token-count"
                    class="token-count ${tokenWarning ? 'token-count--warning' : ''} ${tokenError
                      ? 'token-count--error'
                      : ''}"
                    role="status"
                  >
                    ${estimatedTokens} / ${this.maxTokens} tokens
                  </span>
                `
              : ''}
          </div>
          <button
            class="submit-button"
            part="submit-button"
            @click=${this._handleSubmit}
            ?disabled=${this.disabled || this.loading || !this.value.trim()}
            aria-label="Submit prompt"
          >
            ${this.loading ? html`<span class="loading-spinner"></span> Processing...` : 'Submit'}
          </button>
        </div>

        ${this._focused && !this.disabled
          ? html`
              <div class="hint-text" role="note">
                Press <kbd>⌘ + Enter</kbd> or <kbd>Ctrl + Enter</kbd> to submit
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-prompt-input': AIPromptInput;
  }
}
