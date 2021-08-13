import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import {
  enterEvent,
  spaceDownEvent,
  spaceUpEvent,
  gDownEvent,
  gUpEvent,
  mainButtonUpEvent,
  secondaryButtonUpEvent,
  spaceEvent,
} from '../../test/utils';
import { AccordionItem } from './accordion-item';
import './index.ts';

describe('Accordion item', () => {
  it('loads default', async () => {
    const el = await fixture<AccordionItem>(
      html`<fmn-accordion-item label="item">Accordion item</fmn-accordion-item>`
    );

    expect(el).to.not.be.undefined;
    expect(el.textContent).to.include('item');
    expect(el.textContent).to.include('Accordion item');
    await expect(el).to.be.accessible();
  });

  it('manages "label"', async () => {
    const el = await fixture<AccordionItem>(
      html`<fmn-accordion-item label="item">Accordion item</fmn-accordion-item>`
    );
    const button = el.shadowRoot.getElementById('button');

    expect(button.textContent).to.include('item');

    el.label = 'Item';
    await elementUpdated(el);

    expect(button.textContent).to.include('Item');
  });

  it('manages "open"', async () => {
    const el = await fixture<AccordionItem>(
      html`<fmn-accordion-item label="item">Accordion item</fmn-accordion-item>`
    );
    const button = el.shadowRoot.getElementById('button');
    const content = el.shadowRoot.getElementById('content');

    expect(el.open).to.be.false;
    expect(button.getAttribute('aria-expanded')).to.equal('false');
    expect(content.hidden).to.be.true;

    button.dispatchEvent(mainButtonUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.true;
    expect(button.getAttribute('aria-expanded')).to.equal('true');
    expect(content.hidden).to.be.false;

    button.dispatchEvent(mainButtonUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.false;
    expect(button.getAttribute('aria-expanded')).to.equal('false');
    expect(content.hidden).to.be.true;

    button.dispatchEvent(secondaryButtonUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.false;
    expect(button.getAttribute('aria-expanded')).to.equal('false');
    expect(content.hidden).to.be.true;
  });

  it('manages "disabled"', async () => {
    const el = await fixture<AccordionItem>(
      html`
        <fmn-accordion-item label="item" aria-disabled="true">
          Accordion item
        </fmn-accordion-item>
      `
    );
    const button = el.shadowRoot.getElementById('button') as HTMLButtonElement;
    const content = el.shadowRoot.getElementById('content');

    expect(el.disabled).to.be.true;
    expect(button.disabled).to.be.true;
    expect(content.hidden).to.be.true;

    el.dispatchEvent(mainButtonUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.false;
    expect(content.hidden).to.be.true;

    el.dispatchEvent(enterEvent);

    expect(el.open).to.be.false;
    expect(content.hidden).to.be.true;

    el.disabled = false;
    await elementUpdated(el);

    expect(el.hasAttribute('aria-disabled')).to.be.false;
    expect(button.disabled).to.be.false;
  });

  it('manages focus', async () => {
    const el = await fixture<AccordionItem>(
      html`
        <fmn-accordion-item label="item"> Accordion item </fmn-accordion-item>
      `
    );
    el.focus();
    await elementUpdated(el);

    expect(document.hasFocus()).to.be.true;
    expect(document.activeElement).to.equal(el);
  });

  it('manages keyboard event', async () => {
    const el = await fixture<AccordionItem>(
      html`
        <fmn-accordion-item label="item"> Accordion item </fmn-accordion-item>
      `
    );
    const button = el.shadowRoot.getElementById('button');

    button.dispatchEvent(enterEvent);
    await elementUpdated(el);

    expect(el.open).to.be.true;

    button.dispatchEvent(spaceEvent);
    await elementUpdated(el);

    expect(el.open).to.be.true;

    button.dispatchEvent(spaceDownEvent);
    button.dispatchEvent(spaceUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.false;

    button.dispatchEvent(spaceDownEvent);
    button.dispatchEvent(gUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.false;

    button.dispatchEvent(spaceUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.true;

    button.dispatchEvent(gDownEvent);
    button.dispatchEvent(spaceUpEvent);
    await elementUpdated(el);

    expect(el.open).to.be.true;
  });
});
