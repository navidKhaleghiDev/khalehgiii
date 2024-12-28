import { ReactElement } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BaseSlider } from './BaseSlider';

const meta: Meta<typeof BaseSlider> = {
  title: 'atoms/Slider/BaseSlider',
  component: BaseSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          This BaseSlider component.
          `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    minValue: {
      control: { type: 'number' },
      description: 'Minimum value for the slider',
    },
    maxValue: {
      control: { type: 'number' },
      description: 'Maximum value for the slider',
    },
    defaultValue: {
      control: { type: 'number' },
      description: 'Initial Value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback on value change',
    },
  },
  decorators: [
    (Story): ReactElement => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    minValue: 0,
    maxValue: 100,
    defaultValue: 20,
  },
};
