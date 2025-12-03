import { LitElement, html, css, TemplateResult } from 'lit';
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

  // Track focus state for styling and accessibility
  @state() private _focused = false;

  static styles = css`
    :host {
      display: block;
      --_focus-ring: 0 0 0 3px rgba(99, 102, 241, 0.15);
      --_ai-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: var(--ai-input-padding, 0.75rem 1rem);
      border: var(--ai-input-border, 1.5px solid #e2e8f0);
      border-radius: var(--ai-input-radius, 0.75rem);
      background: var(--ai-input-bg, #ffffff);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.02),
        0 2px 4px rgba(0, 0, 0, 0.02);
    }

    .input-wrapper:hover:not(:focus-within) {
      border-color: #cbd5e1;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.03),
        0 4px 8px rgba(0, 0, 0, 0.03);
    }

    .input-wrapper:focus-within {
      border-color: #6366f1;
      box-shadow:
        var(--_focus-ring),
        0 4px 12px rgba(99, 102, 241, 0.1);
    }

    :host([error]) .input-wrapper {
      border-color: #f87171;
      background: #fef2f2;
    }

    :host([error]) .input-wrapper:focus-within {
      box-shadow:
        0 0 0 3px rgba(248, 113, 113, 0.15),
        0 4px 12px rgba(239, 68, 68, 0.1);
    }

    :host([disabled]) .input-wrapper {
      opacity: 0.6;
      cursor: not-allowed;
      background: #f8fafc;
      border-color: #e2e8f0;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ai-input-color, #1e293b);
      font-family: inherit;
      font-size: 0.9375rem;
      font-weight: 450;
      letter-spacing: -0.01em;
    }

    input::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }

    input:disabled {
      cursor: not-allowed;
      color: #94a3b8;
    }

    /* Size variants */
    :host([size='small']) .input-wrapper {
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
    }

    :host([size='small']) input {
      font-size: 0.8125rem;
    }

    :host([size='large']) .input-wrapper {
      padding: 1rem 1.25rem;
      border-radius: 0.875rem;
    }

    :host([size='large']) input {
      font-size: 1.0625rem;
    }

    /* AI suggestion ghost text */
    .suggestion-overlay {
      position: absolute;
      left: 1rem;
      right: 1rem;
      pointer-events: none;
      font-size: 0.9375rem;
      font-weight: 450;
      white-space: nowrap;
      overflow: hidden;
    }

    .suggestion-overlay::before {
      content: attr(data-prefix);
      opacity: 0;
    }

    /* AI suggestion styling */
    :host([aiSuggestions]) .input-wrapper {
      background: linear-gradient(135deg, #faf5ff 0%, #f8faff 100%);
    }

    :host([aiSuggestions]) .input-wrapper:focus-within {
      border-color: #8b5cf6;
      box-shadow:
        0 0 0 3px rgba(139, 92, 246, 0.12),
        0 4px 12px rgba(139, 92, 246, 0.08);
    }

    .suggestion-overlay {
      color: #a78bfa;
    }

    /* Slot styling */
    ::slotted([slot='prefix']),
    ::slotted([slot='suffix']) {
      display: flex;
      align-items: center;
      color: #64748b;
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

  private _handleChange(_e: Event) {
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

  render(): TemplateResult {
    return html`
      <div class="input-wrapper ${this._focused ? 'focused' : ''}" part="wrapper">
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
