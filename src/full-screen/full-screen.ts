import { LitElement, html } from 'lit';
import type { TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { fullscreenStyles } from './full-screen.styles';

export class Fullscreen extends LitElement {
  public static styles = fullscreenStyles;

  @state()
  private _vh: number = window.innerHeight;

  private _setHeight = () => {
    if (this._vh === window.innerHeight) return;

    this._vh = window.innerHeight;
    this.style.setProperty('--hr-vh', `${this._vh}px`);
  };

  connectedCallback(): void {
    super.connectedCallback();

    this.style.setProperty('--hr-vh', `${this._vh}px`);
    window.addEventListener('resize', this._setHeight);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('resize', this._setHeight);
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`;
  }
}
