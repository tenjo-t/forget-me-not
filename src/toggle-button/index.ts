import { ToggleButton } from './toggle-button';

customElements.define('fmn-toggle-button', ToggleButton);

declare global {
  interface HTMLElementTagNameMap {
    'fmn-toggle-button': ToggleButton;
  }
}
