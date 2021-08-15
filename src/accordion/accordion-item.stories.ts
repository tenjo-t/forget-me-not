import { Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import './index';

type Props = {
  disabled: boolean;
};

export default {
  title: 'Accordion Item',
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export const AccordionItem: Story<Props> = () =>
  html` <fmn-accordion-item label="Heading 1">Item 1</fmn-accordion-item> `;

export const DisabledItem: Story<Props> = ({
  disabled,
}): TemplateResult => html`
  <fmn-accordion-item label="Heading 1" aria-disabled=${disabled}>
    Item 1
  </fmn-accordion-item>
`;
DisabledItem.args = {
  disabled: true,
};
