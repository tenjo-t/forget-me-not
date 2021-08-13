import { LitElement, html } from 'lit';
import type { TemplateResult, PropertyValues } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';

import { AccordionItem } from './accordion-item';
import { isEnter, isSpace, isMainButton } from '../shared/press';

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
    this.addEventListener('keydown', this.handleArrowKey);
  }

  private stopListeningToKeyboard(): void {
    this.removeEventListener('keydown', this.handleArrowKey);
  }

  private handleArrowKey(e: KeyboardEvent): void {
    const { key, target } = e;
    if (!(target instanceof AccordionItem)) {
      return;
    }
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();
      this.focusItemByOffset(target, key === 'ArrowDown' ? 1 : -1);
    } else if (key === 'Home' || key === 'End') {
      e.preventDefault();
      const { items } = this;
      items[key === 'Home' ? 0 : items.length - 1].focus();
    }
  }

  private focusItemByOffset(el: AccordionItem, direction: number): void {
    const { items } = this;
    const focused = items.indexOf(el);
    let next = (items.length + focused + direction) % items.length;
    let nextItem = items[next];
    while (nextItem.disabled) {
      next = (items.length + next + direction) % items.length;
      nextItem = items[next];
    }
    if (next === focused) {
      return;
    }
    nextItem.focus();
  }

  private handlePointerup(e: PointerEvent) {
    if (!isMainButton(e)) {
      return;
    }
    this.toggleItem(e.target);
  }

  private handleKeypress(e: KeyboardEvent) {
    if (isEnter(e)) {
      this.toggleItem(e.target);
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    if (isSpace(e)) {
      this.addEventListener('keyup', this.handleKeyup);
    }
  }

  private handleKeyup(e: KeyboardEvent) {
    if (isSpace(e)) {
      this.removeEventListener('keyup', this.handleKeyup);
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
    this.addEventListener('keydown', this.handleKeydown);
  }
}
