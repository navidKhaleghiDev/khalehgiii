import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BaseInputNumber } from '.';

// Type definition for a story based on BaseInput
type StoryBaseInputNumber = StoryObj<typeof BaseInputNumber>;

// Main instruction for story
const meta: Meta<typeof BaseInputNumber> = {
  title: 'atoms/inputs/BaseInputNumber',
  component: BaseInputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BaseInput',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onClickIcon: fn(),
    pureOnChange: fn(),
    name: 'base input',
    intent: 'default',
    size: 'md',
    min: 0,
    max: 15,
  },
  argTypes: {
    dir: {
      control: {
        type: 'select',
      },
      options: ['rtl', 'ltr'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'freeWidth'],
    },
    intent: {
      control: {
        type: 'select',
      },
      options: ['default', 'error'],
    },
  },
  // Adding font family
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ fontFamily: 'on' }}>
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <BaseInputNumber
      name={args.name}
      id={args.id}
      dir={args.dir}
      placeholder={args.placeholder}
      label={args.label}
      intent={args.intent}
      max={args.max}
      min={args.min}
      size={args.size}
      className={args.className}
      defaultValue={args.defaultValue}
      fullWidth={args.fullWidth}
      hiddenError={args.hiddenError}
      iconButtonIcon={args.iconButtonIcon}
      rules={args.rules}
      control={args.control}
      pureError={args.pureError}
      pureValue={args.pureValue}
      pureOnChange={args.pureOnChange}
      onClickIcon={args.onClickIcon}
      setError={args.setError}
    />
  ),
};

export default meta;

// Defining  stories based on size & intent
export const defaultInput: StoryBaseInputNumber = {
  args: {
    id: '0',
    placeholder: '0',
    label: 'Default',
  },
};
