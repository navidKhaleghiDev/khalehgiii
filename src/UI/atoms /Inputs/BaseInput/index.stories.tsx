import { type Meta, type StoryObj } from '@storybook/react';

import { BaseInput } from '.';

// Custom Types for storyBook

type StorySearchInput = StoryObj<typeof BaseInput>;

// Main instruction for story
const meta: Meta<typeof BaseInput> = {
  title: 'atoms/inputs/BaseInput',
  component: BaseInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BaseInput',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'نام کاربری',
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
export const searchInput: StorySearchInput = {
  args: {},
};

export default meta;
