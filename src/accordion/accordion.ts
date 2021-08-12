import { LitElement, html } from 'lit';
import type { TemplateResult, PropertyValues } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';

import { AccordionItem } from './accordion-item';
import { isValidKeyboardEvent } from '../shared/press';

export class Accordion extends LitElement {
  @property({ type: Boolean })
  public multiple = false;

  @queryAssignedNodes()
  private defaultNodes!: NodeListOf<HTMLElement>;

  private get items() {
    return [...(this.defaultNodes || [])].filter(
      (node) => node instanceof AccordionItem
    ) as AccordionItem[];
  }

  private startListeningToKeyboard(): void {
    const { items } = this;
    if (items && !items.length) {
      return;
    }
    this.addEventListener('keydown', this.handleKeydown);
  }

  private stopListeningToKeyboard(): void {
    this.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown(e: KeyboardEvent): void {
    const { code, target } = e;
    if (!(target instanceof AccordionItem)) {
      return;
    }
    if (code === 'ArrowDown' || code === 'ArrowUp') {
      e.preventDefault();
      this.focusItemByOffset(target, code === 'ArrowDown' ? 1 : -1);
    }
    if (code === 'Home' || code === 'End') {
      e.preventDefault();
      const { items } = this;
      items[code === 'Home' ? 0 : items.length - 1].focus();
    }
  }

  private focusItemByOffset(el: AccordionItem, direction: number): void {
    const { items } = this;
    const focused = items.indexOf(el);
    const next = (items.length + focused + direction) % items.length;
    const nextItem = items[next];
    if (!nextItem || nextItem.disabled || next === focused) {
      return;
    }
    nextItem.focus();
  }

  private handlePointerup(e: PointerEvent) {
    if (e.button !== 0) {
      return;
    }
    this.toggleItem(e.target);
  }

  private handleKeypress(e: KeyboardEvent) {
    if (isValidKeyboardEvent(e)) {
      this.toggleItem(e.target);
    }
  }

  private toggleItem(el: EventTarget | null): void {
    if (this.multiple || !(el instanceof AccordionItem) || !el.open) {
      return;
    }
    const { items } = this;
    const active = items.find((elm) => elm.open === true && elm !== el);
    if (active) {
      active.open = false;
    }
  }

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }

  protected firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);

    this.addEventListener('focusin', this.startListeningToKeyboard);
    this.addEventListener('focusout', this.stopListeningToKeyboard);
    this.addEventListener('pointerup', this.handlePointerup);
    this.addEventListener('keypress', this.handleKeypress);
  }
}
