import { LitElement } from 'lit';
import type { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

export type DisabledElement = HTMLElement & { disabled: boolean };

export abstract class FocusableElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @property({ type: Boolean })
  public autofocus = false;

  @property({ type: Number })
  public get tabIndex(): number {
    if (this.focusElement === this) {
      const tabindex = this.hasAttribute('tabindex')
        ? Number(this.getAttribute('tabindex'))
        : NaN;
      return !Number.isNaN(tabindex) ? tabindex : -1;
    }

    const tabIndexAttribute = parseFloat(
      this.hasAttribute('tabindex') ? this.getAttribute('tabindex') || '0' : '0'
    );

    if (this.disabled || tabIndexAttribute < 0) return -1;
    if (!this.focusElement) return tabIndexAttribute;

    return this.focusElement.tabIndex;
  }

  public set tabIndex(tabindex: number) {
    if (this.focusElement === this) {
      if (tabindex !== this.tabIndex) {
        this._tabindex = tabindex;
        this.setAttribute('tabindex', this.disabled ? '-1' : `${tabindex}`);
      }
      return;
    }

    if (tabindex === -1 || this.disabled) {
      this.setAttribute('tabindex', '-1');
      if (tabindex !== -1) {
        this.manageFocusElementTabIndex(tabindex);
      }
      return;
    }

    if (this.hasAttribute('tabindex')) {
      this.removeAttribute('tabindex');
    }

    this.manageFocusElementTabIndex(tabindex);
  }

  private _tabindex = 0;

  private async manageFocusElementTabIndex(tabindex: number) {
    if (!this.focusElement) {
      await this.updateComplete;
    }
    if (tabindex === null) {
      this.focusElement.removeAttribute('tabindex');
    } else {
      this.focusElement.tabIndex = tabindex;
    }
  }

  protected abstract get focusElement(): DisabledElement;

  public focus(options?: FocusOptions): void {
    if (this.disabled || !this.focusElement) {
      return;
    }

    if (this.focusElement !== this) {
      this.focusElement.focus(options);
    } else {
      super.focus(options);
    }
  }

  public blur(): void {
    if (this.focusElement !== this) {
      this.focusElement.blur();
    } else {
      super.blur();
    }
  }

  public click(): void {
    if (this.disabled) {
      return;
    }

    if (this.focusElement !== this) {
      this.focusElement.click();
    } else {
      super.click();
    }
  }

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
    if (this.autofocus) {
      this.focus();
    }
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('disabled')) {
      this.handleDisabledChanged(
        this.disabled,
        changedProperties.get('disabled') as boolean
      );
    }

    super.update(changedProperties);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('disabled') && this.disabled) {
      this.blur();
    }
  }

  private async handleDisabledChanged(disabled: boolean, oldDisabled: boolean) {
    const canSetDisabled = () =>
      this.focusElement !== this &&
      typeof this.focusElement.disabled !== 'undefined';

    if (disabled) {
      this.setAttribute('tabindex', '-1');
      await this.updateComplete;
      if (canSetDisabled()) {
        this.focusElement.disabled = true;
      } else {
        this.setAttribute('aria-disabled', 'true');
      }
    } else if (oldDisabled) {
      if (this.focusElement === this) {
        this.setAttribute('tabindex', `${this._tabindex}`);
      } else {
        this.removeAttribute('tabindex');
      }
      await this.updateComplete;
      if (canSetDisabled()) {
        this.focusElement.disabled = false;
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }
}
