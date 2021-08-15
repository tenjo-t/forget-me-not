/* eslint-disable no-console */
/* eslint-disable lit-a11y/no-autofocus */
import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

type Props = {
  disabled: boolean;
  label: string;
};

export default {
  title: 'Toggle Button',
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

const handleClick = (e: Event) => console.log(e);

export const Button: Story<Props> = ({ label }) => html`
  <style>
    #toggle-button[aria-pressed] {
      color: #fff;
      background-color: #000;
    }
  </style>
  <fmn-toggle-button id="toggle-button" @click=${handleClick}>
    ${label}
  </fmn-toggle-button>
`;
Button.args = {
  label: 'Button!',
};

export const AutoFocus: Story<Props> = ({ label }) => html`
  <style>
    #toggle-button[aria-pressed] {
      color: #fff;
      background-color: #000;
    }
  </style>
  <fmn-toggle-button id="toggle-button" autofocus> ${label} </fmn-toggle-button>
`;
AutoFocus.args = {
  label: 'Auto focus',
};

export const Disabled: Story<Props> = ({ disabled }) =>
  html`<fmn-toggle-button ?disabled=${disabled}>Disabled</fmn-toggle-button>`;
Disabled.args = {
  disabled: true,
};
