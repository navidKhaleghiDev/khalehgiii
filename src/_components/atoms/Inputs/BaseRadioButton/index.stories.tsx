import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { BaseRadioButton } from '.';

type StoryBaseRadioButton = StoryObj<typeof BaseRadioButton>;

const meta: Meta<typeof BaseRadioButton> = {
  title: 'atoms/Inputs/BaseRadioButton',
  component: BaseRadioButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BaseTextArea',
      },
    },
  },
  args: {
    name: 'radiobutton',
    id: 'radio',
    label: 'label',
    className: 'font-kalameh',
    onChange: fn(),
    size: 'responsive',
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
    },
    checked: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'responsive'],
    },
  },
  render: (args) => (
    <>
      <BaseRadioButton
        id={args.id}
        name={args.name}
        checked={args.checked}
        className={args.className}
        defaultValue={args.defaultValue}
        label={args.label}
        value={args.value}
        onChange={args.onChange}
        size={args.size}
      />
      <br />
      <BaseRadioButton
        id={args.id + 1}
        name={args.name}
        checked={args.checked}
        className={args.className}
        defaultValue={args.defaultValue}
        label={args.label}
        value={args.value}
        onChange={args.onChange}
        size={args.size}
      />
    </>
  ),
};

export const defaultRadioButton: StoryBaseRadioButton = {
  args: {
    size: 'responsive',
  },
};

export default meta;
