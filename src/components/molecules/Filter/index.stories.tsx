// Custom Types for storyBook
import { type Meta, type StoryObj } from '@storybook/react';
import { FilterServices } from '.';

type StoryFilterServices = StoryObj<typeof FilterServices>;

// Main instruction for story
const meta: Meta<typeof FilterServices> = {
  title: 'molecules/FilterServices',
  component: FilterServices,
  parameters: {
    layout: 'centered',
  },
  args: {},
  argTypes: {
    pureOnChange: { action: 'pure on change' },
  },
  tags: ['autodocs'],
  // Adding font family
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ fontFamily: 'on' }}>
        <Story />
      </div>
    ),
  ],
};

// Define different stories base on size and error
export const defaultFilterServices: StoryFilterServices = {};

export default meta;
