import { LitElement, html, css } from 'lit';
import type { TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';

import { isEnter, isSpace, isMainButton } from '../shared/press';

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

  @query('#button')
  private focusElement!: HTMLButtonElement;

  public focus(option?: FocusOptions): void {
    this.focusElement.focus(option);
  }

  private handlePointerup(e: PointerEvent) {
    if (this.disabled || !isMainButton(e)) {
      return;
    }
    this.handleOpen();
  }

  private handleKeypress(e: KeyboardEvent) {
    if (this.disabled || !isEnter(e)) {
      return;
    }
    this.handleOpen();
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled || !isSpace(e)) {
      return;
    }
    e.preventDefault();
    this.focusElement.addEventListener('keyup', this.handleKeyup);
  };

  private handleKeyup = (e: KeyboardEvent) => {
    if (this.disabled || !isSpace(e)) {
      return;
    }
    this.focusElement.removeEventListener('keyup', this.handleKeyup);
    this.handleOpen();
  };

  private handleOpen() {
    this.open = !this.open;
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
          @keydown=${this.handleKeydown}
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
