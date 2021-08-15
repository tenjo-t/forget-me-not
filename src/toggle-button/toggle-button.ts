import { html, css } from 'lit';
import type { PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { FocusableElement } from '../shared/focusable';
import type { DisabledElement } from '../shared/focusable';
import { isEnter, isSpace, isMainButton } from '../shared/press';

export class ToggleButton extends FocusableElement {
  static styles = css`
    :host > * {
      user-select: none;
    }
    :host(:not([disabled])) {
      cursor: pointer;
    }
    :host(:focus-visible:not([disabled])) {
      outline: #000 auto 1px;
    }
  `;

  @property({ type: Boolean, reflect: true, attribute: 'aria-pressed' })
  public pressed = false;

  public onPress: ((e: boolean) => void) | undefined;

  protected get focusElement(): DisabledElement {
    return this;
  }

  public constructor() {
    super();
    this.addEventListener('click', this.handleClickCapture);
  }

  private handleClickCapture(e: Event): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
  }

  private handlePointerup(e: PointerEvent) {
    if (this.disabled || !isMainButton(e)) {
      return;
    }
    this.handlePressed();
  }

  private handleKeypress(e: KeyboardEvent) {
    if (this.disabled || !isEnter(e)) {
      return;
    }
    this.handlePressed();
  }

  private handleKeydown(e: KeyboardEvent) {
    if (this.disabled || !isSpace(e)) {
      return;
    }
    e.preventDefault();
    this.addEventListener('keyup', this.handleKeyup);
  }

  private handleKeyup(e: KeyboardEvent) {
    if (this.disabled || !isSpace(e)) {
      return;
    }
    this.removeEventListener('keyup', this.handleKeyup);
    this.handlePressed();
  }

  private handlePressed() {
    this.pressed = !this.pressed;
    if (this.onPress) {
      this.onPress(this.pressed);
    }
  }

  public firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    this.addEventListener('pointerup', this.handlePointerup);
    this.addEventListener('keypress', this.handleKeypress);
    this.addEventListener('keydown', this.handleKeydown);
  }

  public render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
