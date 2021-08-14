import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

type Props = {
  disabled: boolean;
  multiple: boolean;
};

export default {
  title: 'Accordion',
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
};

export const Accordion: Story<Props> = () =>
  html`
    <fmn-accordion>
      <fmn-accordion-item label="Heading 1">Item 1</fmn-accordion-item>
      <fmn-accordion-item label="Heading 2">Item 2</fmn-accordion-item>
      <fmn-accordion-item label="Heading 3">Item 3</fmn-accordion-item>
      <fmn-accordion-item label="Heading 4"
        ><input placeholder="Item4"
      /></fmn-accordion-item>
    </fmn-accordion>
  `;

export const Multiple: Story<Props> = ({ multiple }) =>
  html`
    <fmn-accordion ?multiple=${multiple}>
      <fmn-accordion-item label="Heading 1">Item 1</fmn-accordion-item>
      <fmn-accordion-item label="Heading 2">Item 2</fmn-accordion-item>
      <fmn-accordion-item label="Heading 3">Item 3</fmn-accordion-item>
      <fmn-accordion-item label="Heading 4"
        ><input placeholder="Item4"
      /></fmn-accordion-item>
    </fmn-accordion>
  `;
Multiple.args = {
  multiple: true,
};

export const DisabledItem: Story<Props> = ({ disabled }) =>
  html`
    <fmn-accordion>
      <fmn-accordion-item label="Heading 1">Item 1</fmn-accordion-item>
      <fmn-accordion-item label="Heading 2" aria-disabled=${disabled}>
        Item 2
      </fmn-accordion-item>
    </fmn-accordion>
  `;
DisabledItem.args = {
  disabled: true,
};
