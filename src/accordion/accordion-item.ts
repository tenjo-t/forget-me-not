import { LitElement, html, css } from 'lit';
import type { TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { isValidKeyboardEvent } from '../shared/press';

export class AccordionItem extends LitElement {
  static styles = css`
    h3 {
      padding: 0;
      margin: 0;
    }
    button {
      display: block;
      width: 100%;
    }
  `;

  @property({ reflect: true })
  public label = '';

  @property({ type: Boolean, reflect: true })
  public open = false;

  @property({ type: Boolean, reflect: true, attribute: 'aria-disabled' })
  public disabled = false;

  public focus(option?: FocusOptions): void {
    (this.renderRoot.querySelector('#button') as HTMLButtonElement).focus(
      option
    );
  }

  private handlePointerup(e: PointerEvent) {
    if (this.disabled || e.button !== 0) return;

    this.open = !this.open;
  }

  private handleKeypress(e: KeyboardEvent) {
    if (isValidKeyboardEvent(e)) {
      this.open = !this.open;
    }
  }

  protected render(): TemplateResult {
    return html`
      <h3 id="header" part="header">
        <button
          id="button"
          type="button"
          aria-expanded=${this.open}
          aria-controls="content"
          ?disabled=${this.disabled}
          @pointerup=${this.handlePointerup}
          @keypress=${this.handleKeypress}
          part="button"
        >
          ${this.label}
        </button>
      </h3>
      <div
        id="content"
        role="region"
        aria-labelledby="header"
        ?hidden=${this.disabled || !this.open}
        part="content"
      >
        <slot></slot>
      </div>
    `;
  }
}
