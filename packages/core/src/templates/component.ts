import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * [Component Display Name]
 *
 * [Detailed description of what this component does and when to use it]
 *
 * @element ai-component-name
 *
 * @fires {event-name} - Dispatched when [event occurs]
 *
 * @prop {type} propName - Description of prop
 *
 * @slot - Default slot description
 * @slot slotName - Named slot description
 *
 * @csspart partName - Exposed shadow part
 *
 * @cssprop --custom-property - Description
 *
 * @example
 * ```html
 * <ai-component-name
 *   prop="value"
 * ></ai-component-name>
 * ```
 *
 * @accessibility
 * - WCAG AA compliant
 * - Keyboard navigable
 * - Screen reader accessible
 *
 * @research
 * - [Source 1 Name] ([Year]): [URL]
 * - [Source 2 Name] ([Year]): [URL]
 */
@customElement('ai-component-name')
export class AIComponentName extends LitElement {
  /**
   * [Property description]
   */
  @property({ type: String }) variant: 'default' | 'primary' = 'default';

  /**
   * [Internal state description]
   */
  @state() private _internalState = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-sans, system-ui, sans-serif);
    }

    /* Component-specific styles */
    .container {
      /* styles */
    }
  `;

  /**
   * [Lifecycle or custom method description]
   */
  private handleEvent(): void {
    this.dispatchEvent(
      new CustomEvent('event-name', {
        bubbles: true,
        composed: true,
        detail: {
          /* ... */
        },
      })
    );
  }

  render(): TemplateResult {
    return html`
      <div class="container" part="container">
        <!-- Component template -->
        <slot></slot>
      </div>
    `;
  }
}

// TypeScript declaration for autocomplete
declare global {
  interface HTMLElementTagNameMap {
    'ai-component-name': AIComponentName;
  }
}
