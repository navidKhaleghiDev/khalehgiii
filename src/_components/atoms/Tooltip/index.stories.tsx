import { ReactElement } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import ToolTip from '.';

const meta: Meta<typeof ToolTip> = {
  title: 'atoms/ToolTip',
  component: ToolTip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          This ToolTip component.when hover element show tooltips.
          `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: { type: 'text' } },
    tooltip: { control: { type: 'text' } },
    position: {
      control: { type: 'select' },
      options: [
        'left',
        'top',
        'right',
        'bottom',
        'topStart',
        'topEnd',
        'bottomStart',
        'bottomEnd',
      ],
    },
  },
  decorators: [
    (Story): ReactElement => (
      <div className="font-kalameh w-full h-full p-2 rounded-sm bg-teal-500">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'this is tooltip',
    tooltip: 'tooltip',
    position: 'left',
  },
};
