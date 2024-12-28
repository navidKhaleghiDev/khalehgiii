import { type Meta, type StoryObj } from '@storybook/react';

import { BaseCheckBox } from '.';

// Custom Types for storyBook
type StoryBaseCheckBox = StoryObj<typeof BaseCheckBox>;

// Main instruction for story
const meta: Meta<typeof BaseCheckBox> = {
  title: 'atoms/inputs/BaseCheckBox',
  component: BaseCheckBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BaseCheckBox',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    size: 'md',
  },
  argTypes: {
    onChange: { action: 'changed' },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md'],
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
export const checkBox: StoryBaseCheckBox = {
  args: {
    id: 'baseCheckBox',
    name: 'baseCheckBox',
  },
};

export default meta;
