import { ReactElement } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MultipleBaseSlider } from './MultipleBaseSlider';

const meta: Meta<typeof MultipleBaseSlider> = {
  title: 'atoms/Slider/MultipleBaseSlider',
  component: MultipleBaseSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          This MultpleiBaseSlider component.
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
    defaultMinValue: {
      control: { type: 'number' },
      description: 'Initial minimum value selected',
    },
    defaultMaxValue: {
      control: { type: 'number' },
      description: 'Initial maximum value selected',
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
    defaultMinValue: 20,
    defaultMaxValue: 80,
  },
};
