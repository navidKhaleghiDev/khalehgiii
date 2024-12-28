import { type Meta, type StoryObj } from '@storybook/react';

import { PasswordInput } from '.';

// Custom Types for storyBook

type StoryPasswordInput = StoryObj<typeof PasswordInput>;

// Main instruction for story
const meta: Meta<typeof PasswordInput> = {
  title: 'atoms/inputs/passWordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PasswordInput',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'رمز عبور',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg', 'freeWidth'],
    },
  },
  // Adding font family
  decorators: [
    (Story) => (
      <div className="font-kalameh">
        <Story />
      </div>
    ),
  ],
};

// Define story
export const passWordInput: StoryPasswordInput = {
  args: {
    dir: 'rtl',
    error: '',
    disabled: false,
    fullWidth: false,
    helpText: '',
    label: '',
    hiddenError: true,
    intent: 'default',
    placeholder: '',
  },
};

export default meta;
