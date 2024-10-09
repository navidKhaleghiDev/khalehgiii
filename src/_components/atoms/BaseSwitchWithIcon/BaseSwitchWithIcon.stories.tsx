import { Meta, StoryObj } from '@storybook/react';

import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';
import { BaseSwitchWithIcon } from '.';

const meta: Meta<typeof BaseSwitchWithIcon> = {
  title: 'atoms/BaseSwitchWithIcon',
  component: BaseSwitchWithIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The BaseSwitchWithIcon component.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    onChange: { action: 'onClick' },
    rightIcon: { control: 'object' },
    leftIcon: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'switch-with-icon',
    name: 'theme-switcher',
    disabled: false,
    checked: false,
    rightIcon: sunRisingTwotoneLoop,
    leftIcon: moonTwotoneAltLoop,
  },
};
