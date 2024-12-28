import { type Meta, type StoryObj } from '@storybook/react';

import { SearchInput } from '.';

// Custom Types for storyBook

type StorySearchInput = StoryObj<typeof SearchInput>;

// Main instruction for story
const meta: Meta<typeof SearchInput> = {
  title: 'atoms/inputs/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'جست و جو ',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
  // Adding font family
  decorators: [
    (Story) => (
      <div dir="rtl" className="font-kalameh">
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
