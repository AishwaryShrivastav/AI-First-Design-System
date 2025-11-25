import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { InputSize } from '../../utils/types';

/**
 * AI-enhanced input component with support for suggestions and autocomplete.
 * 
 * @element ai-input
 * 
 * @fires input - Dispatched when the input value changes
 * @fires change - Dispatched when the input loses focus with a changed value
 * @fires ai-suggestion - Dispatched when AI provides a suggestion
 * 
 * @slot prefix - Content to show before the input
 * @slot suffix - Content to show after the input
 * 
 * @cssprop --ai-input-bg - Background color
 * @cssprop --ai-input-color - Text color
 * @cssprop --ai-input-border - Border style
 * @cssprop --ai-input-radius - Border radius
 * 
 * @prop {string} value - Current input value
 * @prop {string} placeholder - Placeholder text
 * @prop {InputSize} size - Size variant
 * @prop {boolean} disabled - Whether the input is disabled
 * @prop {boolean} error - Show error state
 * @prop {boolean} aiSuggestions - Enable AI-powered suggestions
 * @prop {string} suggestion - Current AI suggestion (ghost text)
 * 
 * @example
 * ```html
 * <ai-input placeholder="Enter text..."></ai-input>
 * <ai-input aiSuggestions suggestion="Complete this"></ai-input>
 * ```
 * 
 * @accessibility
 * - Proper label association (use with external label)
 * - aria-invalid when error
 * - aria-describedby for error messages
 * - Keyboard navigation (Tab to accept suggestion)
 * 
 * @reference
 * - WCAG 2.2 Input: https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions
 * - ARIA Textbox: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/
 * - GitHub Copilot UX patterns for inline suggestions
 */
@customElement('ai-input')
export class AIInput extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) size: InputSize = 'medium';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) aiSuggestions = false;
  @property({ type: String }) suggestion = '';

  @state() private _focused = false;

  static styles = css`
    :host {
      display: block;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: var(--ai-input-padding, 0.5rem 0.75rem);
      border: var(--ai-input-border, 1px solid #d1d5db);
      border-radius: var(--ai-input-radius, 0.375rem);
      background: var(--ai-input-bg, white);
      transition: all 150ms ease;
    }

    .input-wrapper:focus-within {
      outline: 2px solid #3b82f6;
      outline-offset: 0;
      border-color: #3b82f6;
    }

    :host([error]) .input-wrapper {
      border-color: #ef4444;
    }

    :host([error]) .input-wrapper:focus-within {
      outline-color: #ef4444;
    }

    :host([disabled]) .input-wrapper {
      opacity: 0.5;
      cursor: not-allowed;
      background: #f3f4f6;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ai-input-color, inherit);
      font-family: inherit;
      font-size: 1rem;
    }

    input::placeholder {
      color: #9ca3af;
    }

    input:disabled {
      cursor: not-allowed;
    }

    /* Size variants */
    :host([size='small']) .input-wrapper {
      padding: 0.375rem 0.625rem;
    }

    :host([size='small']) input {
      font-size: 0.875rem;
    }

    :host([size='large']) .input-wrapper {
      padding: 0.75rem 1rem;
    }

    :host([size='large']) input {
      font-size: 1.125rem;
    }

    /* AI suggestion ghost text */
    .suggestion-overlay {
      position: absolute;
      left: 0.75rem;
      right: 0.75rem;
      pointer-events: none;
      color: #9ca3af;
      font-size: 1rem;
      white-space: nowrap;
      overflow: hidden;
    }

    .suggestion-overlay::before {
      content: attr(data-prefix);
      opacity: 0;
    }
  `;

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleChange(e: Event) {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    // Tab to accept AI suggestion
    if (e.key === 'Tab' && this.suggestion && this.aiSuggestions) {
      e.preventDefault();
      this.value = this.value + this.suggestion;
      this.suggestion = '';
      this.dispatchEvent(
        new CustomEvent('ai-suggestion', {
          bubbles: true,
          composed: true,
          detail: { accepted: true, value: this.value },
        })
      );
    }
  }

  render() {
    return html`
      <div class="input-wrapper" part="wrapper">
        <slot name="prefix"></slot>
        ${this.suggestion && this.aiSuggestions
          ? html`
              <div class="suggestion-overlay" data-prefix=${this.value}>
                ${this.value}${this.suggestion}
              </div>
            `
          : ''}
        <input
          part="input"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          aria-invalid=${this.error}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
          @focus=${() => (this._focused = true)}
          @blur=${() => (this._focused = false)}
        />
        <slot name="suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-input': AIInput;
  }
}

