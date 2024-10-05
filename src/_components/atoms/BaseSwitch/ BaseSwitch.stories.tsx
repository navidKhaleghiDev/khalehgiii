import { Meta, StoryObj } from '@storybook/react';

import { BaseSwitch } from '.';

const meta: Meta<typeof BaseSwitch> = {
  title: 'atoms/BaseSwitch',
  component: BaseSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `This BaseSwitch component renders a customizable switch.`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'kalameh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'responsive'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    onChange: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'switch',
    size: 'responsive',
    disabled: false,
  },
};
