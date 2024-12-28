import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CaretCircleUpDown from '@iconify-icons/ph/caret-circle-up-down';

import { BaseButton } from './BaseButton';

const meta: Meta<typeof BaseButton> = {
  title: 'atoms/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: ` This BaseButton component renders a customizable button.
          `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ fontFamily: 'kalameh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },

    type: {
      control: {
        type: 'select',
      },
      options: ['teal', 'red', 'neutral', 'tertiary'],
    },

    loading: { control: 'boolean' },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Button',
    submit: false,
    fullWidth: false,
    disabled: false,
    size: 'md',
    type: 'teal',
    loading: false,
  },
};

export const startIcon: Story = {
  args: {
    label: 'Button',
    startIcon: CaretCircleUpDown,
    submit: false,
    fullWidth: false,
    disabled: false,
    size: 'md',
    type: 'teal',
    loading: false,
  },
};
export const endIcon: Story = {
  args: {
    label: 'دکمه',
    endIcon: CaretCircleUpDown,
    submit: false,
    fullWidth: false,
    disabled: false,
    size: 'sm',
    type: 'teal',
    loading: false,
  },
};
