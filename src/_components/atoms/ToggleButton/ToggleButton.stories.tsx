import { Meta, StoryObj } from '@storybook/react';

import { ToggleButton } from './ToggleButton';
import { ToggleButtonProps } from './types';

type StoryToggleButton = StoryObj<typeof ToggleButton>;

const meta: Meta<typeof ToggleButton> = {
  title: 'atoms/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ToggleButton component that allows selecting one of the provided button options.',
      },
    },
  },
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <div dir="rtl" style={{ fontFamily: 'kalameh' }}>
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
  },
};
export default meta;

function RenderToggleButton({
  buttonOptions,
  onChange,
  size,
}: ToggleButtonProps) {
  return (
    <ToggleButton
      buttonOptions={buttonOptions}
      onChange={onChange}
      size={size}
    />
  );
}
export const toggleButton: StoryToggleButton = {
  render: RenderToggleButton,
  args: {
    buttonOptions: [
      { id: 1, label: 'هفتگی' },
      { id: 2, label: 'ماهانه' },
      { id: 3, label: 'سالانه' },
    ],
    size: 'md',
  },
};
