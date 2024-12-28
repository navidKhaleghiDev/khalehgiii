import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PhUser from '@iconify-icons/ph/user';

import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `This IconButton component renders a button with an icon.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['teal', 'redNoBg', 'neutral', 'neutralNoBg'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'default'],
    },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: PhUser,
    color: 'teal',
    size: 'sm',
    loading: false,
  },
};
