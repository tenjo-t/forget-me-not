import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import {
  enterEvent,
  spaceEvent,
  spaceDownEvent,
  spaceUpEvent,
  gDownEvent,
  gUpEvent,
  mainButtonUpEvent,
  secondaryButtonUpEvent,
} from '../../test/utils';
import { ToggleButton } from './toggle-button';
import './index.ts';

describe('Toggle Button', () => {
  it('loads default', async () => {
    const el = await fixture<ToggleButton>(
      html`<fmn-toggle-button>Toggle</fmn-toggle-button>`
    );

    expect(el).to.not.be.undefined;
    expect(el.textContent).to.include('Toggle');
    await expect(el).to.be.accessible();
  });

  it('loads default element content', async () => {
    const el = await fixture<ToggleButton>(
      html`<fmn-toggle-button><div>Toggle</div></fmn-toggle-button>`
    );

    expect(el).to.not.be.undefined;
    await expect(el).to.be.accessible();
  });

  it('manages "role"', async () => {
    const el = await fixture<ToggleButton>(
      html`<fmn-toggle-button>Toggle</fmn-toggle-button>`
    );

    expect(el.getAttribute('role')).to.equal('button');
  });

  it('manages "disabled"', async () => {
    let clickedCount = 0;
    const el = await fixture<ToggleButton>(
      html`
        <fmn-toggle-button
          @click=${() => {
            clickedCount += 1;
          }}
        >
          Toggle
        </fmn-toggle-button>
      `
    );

    expect(el.hasAttribute('aria-disabled'), 'initially not').to.be.false;
    expect(clickedCount).to.equal(0);
    el.click();
    expect(clickedCount).to.equal(1);

    el.disabled = true;
    await elementUpdated(el);

    expect(el.getAttribute('aria-disabled')).to.equal('true');
    el.click();
    expect(clickedCount).to.equal(1);

    el.dispatchEvent(new Event('click', {}));
    expect(clickedCount).to.equal(1);

    el.disabled = false;
    await elementUpdated(el);

    expect(el.hasAttribute('aria-disabled'), 'finally not').to.be.false;
    el.click();
    expect(clickedCount).to.equal(2);
  });

  it('manages tabIndex while disabled', async () => {
    const el = await fixture<ToggleButton>(
      html`<fmn-toggle-button>Toggle</fmn-toggle-button>`
    );

    expect(el.tabIndex).to.equal(0);

    el.disabled = true;
    await elementUpdated(el);

    expect(el.tabIndex).to.equal(-1);

    el.tabIndex = 2;
    await elementUpdated(el);

    expect(el.tabIndex).to.equal(-1);

    el.disabled = false;
    await elementUpdated(el);

    expect(el.tabIndex).to.equal(2);
  });

  // it('manage "autofocus"', async () => {
  //   const el = await fixture<ToggleButton>(
  //     html`<fmn-toggle-button autofocus>Toggle</fmn-toggle-button>`
  //   );

  //   expect(el).to.equal(document.activeElement);
  // });

  it('manages press interaction', async () => {
    let pressedCount = 0;
    const el = await fixture<ToggleButton>(
      html`<fmn-toggle-button>Toggle</fmn-toggle-button>`
    );

    el.onPress = () => {
      pressedCount += 1;
    };
    await elementUpdated(el);

    el.dispatchEvent(enterEvent);
    await elementUpdated(el);

    expect(pressedCount).to.equal(1);

    el.dispatchEvent(spaceEvent);
    await elementUpdated(el);

    expect(pressedCount).to.equal(1);

    el.dispatchEvent(spaceDownEvent);
    el.dispatchEvent(spaceUpEvent);
    await elementUpdated(el);

    expect(pressedCount).to.equal(2);

    el.dispatchEvent(spaceDownEvent);
    el.dispatchEvent(gUpEvent);
    await elementUpdated(el);

    expect(pressedCount).to.equal(2);

    el.dispatchEvent(spaceUpEvent);
    await elementUpdated(el);

    expect(pressedCount).to.equal(3);

    el.dispatchEvent(gDownEvent);
    el.dispatchEvent(spaceUpEvent);
    await elementUpdated(el);

    expect(pressedCount).to.equal(3);
  });

  it('manages pointer events', async () => {
    const el = await fixture<ToggleButton>(
      html`<fmn-toggle-button>Toggle</fmn-toggle-button>`
    );

    el.dispatchEvent(mainButtonUpEvent);
    await elementUpdated(el);

    expect(el.pressed).to.be.true;

    el.dispatchEvent(mainButtonUpEvent);
    await elementUpdated(el);

    expect(el.pressed).to.be.false;

    el.dispatchEvent(secondaryButtonUpEvent);
    await elementUpdated(el);

    expect(el.pressed).to.be.false;
  });
});
