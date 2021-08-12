import { Fullscreen } from './full-screen';

customElements.define('fmn-fullscreen', Fullscreen);

declare global {
  interface HTMLElementTagNameMap {
    'fmn-fullscreen': Fullscreen;
  }
}
