import { type Meta, type StoryObj } from '@storybook/react';

import { BaseTextarea } from '.';

// Custom Types for storyBook

type StoryBaseTextarea = StoryObj<typeof BaseTextarea>;

// Main instruction for story
const meta: Meta<typeof BaseTextarea> = {
  title: 'atoms/inputs/BaseTextarea',
  component: BaseTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BaseTextArea',
      },
    },
  },

  tags: ['autodocs'],
  args: {
    label: 'متن مورد نظر',
  },
  argTypes: {
    onChange: { action: 'changed' },
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
export const BaseTextArea: StoryBaseTextarea = {
  args: {
    id: 'baseTextArea',
    name: 'BaseTextArea',
  },
};

export default meta;
