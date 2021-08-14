import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import {
  enterEvent,
  spaceDownEvent,
  spaceUpEvent,
  gDownEvent,
  arrowDownDownEvent,
  arrowUpDownEvent,
  homeDownEvent,
  endDownEvent,
  mainButtonUpEvent,
} from '../../test/utils';
import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';
import './index.ts';

describe('Accordion', () => {
  it('loads default', async () => {
    const el = await fixture<Accordion>(
      html`
        <fmn-accordion>
          <fmn-accordion-item label="item">Accordion item</fmn-accordion-item>
        </fmn-accordion>
      `
    );

    expect(el).to.not.be.undefined;
    expect(el.childElementCount).to.equal(1);
    await expect(el).to.be.accessible();
    await expect(el.firstElementChild).to.be.accessible();
  });

  it('handles focus and keyboard input', async () => {
    const el = await fixture<Accordion>(
      html`
        <fmn-accordion>
          <fmn-accordion-item label="item1">
            Accordion item 1
          </fmn-accordion-item>
          <fmn-accordion-item label="item2">
            Accordion item 2
          </fmn-accordion-item>
          <fmn-accordion-item label="item3">
            Accordion item 3
          </fmn-accordion-item>
        </fmn-accordion>
      `
    );
    const children = [
      ...el.querySelectorAll('fmn-accordion-item'),
    ] as AccordionItem[];

    el.dispatchEvent(new FocusEvent('focusin'));
    children[0].dispatchEvent(arrowDownDownEvent);
    expect(children[1]).to.equal(document.activeElement);

    children[1].dispatchEvent(arrowDownDownEvent);
    expect(children[2]).to.equal(document.activeElement);

    children[2].dispatchEvent(arrowDownDownEvent);
    expect(children[0]).to.equal(document.activeElement);

    children[0].dispatchEvent(arrowUpDownEvent);
    expect(children[2]).to.equal(document.activeElement);

    children[2].dispatchEvent(arrowUpDownEvent);
    expect(children[1]).to.equal(document.activeElement);

    children[1].dispatchEvent(arrowUpDownEvent);
    expect(children[0]).to.equal(document.activeElement);

    children[0].dispatchEvent(endDownEvent);
    expect(children[2]).to.equal(document.activeElement);

    children[1].dispatchEvent(homeDownEvent);
    expect(children[0]).to.equal(document.activeElement);

    children[0].dispatchEvent(gDownEvent);
    expect(children[0]).to.equal(document.activeElement);
  });

  it('ignores disabled items', async () => {
    const el = await fixture<Accordion>(
      html`
        <fmn-accordion>
          <fmn-accordion-item label="item1">
            Accordion item 1
          </fmn-accordion-item>
          <fmn-accordion-item label="item2">
            Accordion item 2
          </fmn-accordion-item>
          <fmn-accordion-item label="item3">
            Accordion item 3
          </fmn-accordion-item>
        </fmn-accordion>
      `
    );
    const children = [
      ...el.querySelectorAll('fmn-accordion-item'),
    ] as AccordionItem[];

    el.dispatchEvent(new FocusEvent('focusin'));
    children[1].disabled = true;
    await elementUpdated(el);

    children[0].dispatchEvent(arrowDownDownEvent);
    expect(children[2]).to.equal(document.activeElement);

    children[2].dispatchEvent(arrowUpDownEvent);
    expect(children[0]).to.equal(document.activeElement);
  });

  it('only allows one open item by default', async () => {
    const el = await fixture<Accordion>(
      html`
        <fmn-accordion>
          <fmn-accordion-item label="item1">
            Accordion item 1
          </fmn-accordion-item>
          <fmn-accordion-item label="item2">
            Accordion item 2
          </fmn-accordion-item>
        </fmn-accordion>
      `
    );
    const firstElementChild = el.firstElementChild as AccordionItem;
    const lastElementChild = el.lastElementChild as AccordionItem;

    firstElementChild.open = true;
    await elementUpdated(el);

    expect(firstElementChild.open).to.be.true;
    expect(lastElementChild.open).to.be.false;

    lastElementChild.shadowRoot
      .getElementById('button')
      .dispatchEvent(enterEvent);
    await elementUpdated(el);

    expect(firstElementChild.open).to.be.false;
    expect(lastElementChild.open).to.be.true;

    firstElementChild.shadowRoot
      .getElementById('button')
      .dispatchEvent(spaceDownEvent);
    firstElementChild.shadowRoot
      .getElementById('button')
      .dispatchEvent(spaceUpEvent);
    await elementUpdated(el);

    expect(firstElementChild.open).to.be.true;
    expect(lastElementChild.open).to.be.false;

    lastElementChild.shadowRoot
      .getElementById('button')
      .dispatchEvent(mainButtonUpEvent);
    await elementUpdated(el);

    expect(firstElementChild.open).to.be.false;
    expect(lastElementChild.open).to.be.true;
  });

  it('allows more than one open item when "multiple"', async () => {
    const el = await fixture<Accordion>(
      html`
        <fmn-accordion multiple>
          <fmn-accordion-item label="item1">
            Accordion item 1
          </fmn-accordion-item>
          <fmn-accordion-item label="item2">
            Accordion item 2
          </fmn-accordion-item>
        </fmn-accordion>
      `
    );
    const firstElementChild = el.firstElementChild as AccordionItem;
    const lastElementChild = el.lastElementChild as AccordionItem;

    firstElementChild.open = true;
    lastElementChild.shadowRoot
      .getElementById('button')
      .dispatchEvent(enterEvent);
    await elementUpdated(el);

    expect(firstElementChild.open).to.be.true;
    expect(lastElementChild.open).to.be.true;

    lastElementChild.shadowRoot
      .getElementById('button')
      .dispatchEvent(enterEvent);
    await elementUpdated(el);

    expect(firstElementChild.open).to.be.true;
    expect(lastElementChild.open).to.be.false;
  });
});
