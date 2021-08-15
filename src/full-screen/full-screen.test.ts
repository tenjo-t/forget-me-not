import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { Fullscreen } from './full-screen';
import './index.ts';

describe('Full screen', () => {
  it('loads default', async () => {
    const el = await fixture<Fullscreen>(
      html`<fmn-fullscreen>Full screen</fmn-fullscreen>`
    );

    expect(el).to.not.be.undefined;
    expect(el.textContent).to.include('Full screen');
    await expect(el).to.be.accessible();
  });

  it('loads default element content', async () => {
    const el = await fixture<Fullscreen>(
      html`<fmn-fullscreen><div>Full screen</div></fmn-fullscreen>`
    );

    expect(el).to.not.be.undefined;
    await expect(el).to.be.accessible();
  });

  it('manage height', async () => {
    const el = await fixture<Fullscreen>(
      html`<fmn-fullscreen>Full screen</fmn-fullscreen>`
    );

    expect(el.offsetHeight).to.equal(window.innerHeight);

    await setViewport({ width: 400, height: 800 });
    await elementUpdated(el);

    expect(el.offsetHeight).to.equal(800);
  });
});
