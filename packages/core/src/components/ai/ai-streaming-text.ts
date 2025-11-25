import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Streaming text component that displays text token-by-token for AI responses.
 *
 * @element ai-streaming-text
 *
 * @fires stream-complete - Dispatched when streaming is complete
 * @fires stream-error - Dispatched when streaming encounters an error
 *
 * @slot - Fallback content (shown when not streaming)
 *
 * @cssprop --ai-streaming-cursor - Cursor color
 *
 * @prop {string} text - Full text to stream
 * @prop {boolean} streaming - Whether currently streaming
 * @prop {number} speed - Streaming speed in ms per character (default: 20)
 * @prop {boolean} showCursor - Show blinking cursor during streaming
 *
 * @example
 * ```html
 * <ai-streaming-text
 *   text="This is streamed text..."
 *   streaming
 *   speed="30"
 * ></ai-streaming-text>
 * ```
 *
 * @accessibility
 * - aria-live for screen reader announcements
 * - Proper role and state attributes
 *
 * @reference
 * - Modern AI streaming patterns (ChatGPT, Claude)
 * - Vercel AI SDK streaming implementation
 */
@customElement('ai-streaming-text')
export class AIStreamingText extends LitElement {
  @property({ type: String }) text = '';
  @property({ type: Boolean }) streaming = false;
  @property({ type: Number }) speed = 20;
  @property({ type: Boolean }) showCursor = true;

  @state() private _displayedText = '';
  @state() private _currentIndex = 0;

  private _streamInterval?: number;

  static styles = css`
    :host {
      display: inline-block;
    }

    .streaming-text {
      position: relative;
      display: inline;
    }

    .cursor {
      display: inline-block;
      width: 0.125rem;
      height: 1em;
      background: var(--ai-streaming-cursor, currentColor);
      margin-left: 0.125rem;
      animation: blink 1s step-end infinite;
      vertical-align: text-bottom;
    }

    @keyframes blink {
      0%,
      50% {
        opacity: 1;
      }
      51%,
      100% {
        opacity: 0;
      }
    }
  `;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('text') || changedProperties.has('streaming')) {
      this._handleStreamingChange();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearStream();
  }

  private _clearStream() {
    if (this._streamInterval) {
      clearInterval(this._streamInterval);
      this._streamInterval = undefined;
    }
  }

  private _handleStreamingChange() {
    this._clearStream();

    if (!this.streaming) {
      this._displayedText = this.text;
      this._currentIndex = this.text.length;
      return;
    }

    // Reset for new streaming
    this._displayedText = '';
    this._currentIndex = 0;

    // Start streaming
    this._streamInterval = window.setInterval(() => {
      if (this._currentIndex < this.text.length) {
        this._displayedText += this.text[this._currentIndex];
        this._currentIndex++;
      } else {
        this._clearStream();
        this.streaming = false;
        this.dispatchEvent(
          new CustomEvent('stream-complete', {
            bubbles: true,
            composed: true,
            detail: { text: this.text },
          })
        );
      }
    }, this.speed);
  }

  render() {
    return html`
      <span
        class="streaming-text"
        part="text"
        role="status"
        aria-live=${this.streaming ? 'polite' : 'off'}
        aria-atomic="false"
      >
        ${this._displayedText || html`<slot></slot>`}
        ${this.streaming && this.showCursor ? html`<span class="cursor"></span>` : ''}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-streaming-text': AIStreamingText;
  }
}
