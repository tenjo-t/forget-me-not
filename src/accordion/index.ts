import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';

customElements.define('fmn-accordion', Accordion);
customElements.define('fmn-accordion-item', AccordionItem);

declare global {
  interface HTMLElementTagNameMap {
    'fmn-accordion': Accordion;
    'fmn-accordion-item': AccordionItem;
  }
}
