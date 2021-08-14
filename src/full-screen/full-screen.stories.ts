import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  title: 'Full Screen',
  argTypes: {},
};

export const FullScreen: Story = () => html`
  <fmn-fullscreen
    style="background-color: #f5f5f5; display: flex; justify-content: center; align-items: center;"
  >
    Hello world!
  </fmn-fullscreen>
`;
