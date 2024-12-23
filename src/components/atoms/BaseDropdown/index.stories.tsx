import { type Meta, type StoryFn, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BaseDropdown } from '@ui/atoms/BaseDropdown';

// Custom Types for storyBook

type StoryDropdown = StoryObj<typeof BaseDropdown>;

// Main instruction for story
const meta: Meta<typeof BaseDropdown> = {
  title: 'atoms/BaseDropdown',
  component: BaseDropdown,
  parameters: {
    layout: 'centered',

    docs: {
      description: {
        component: 'BaseDropdown',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    options: [
      { id: '1', label: 'selected' },
      { id: '2', label: 'postponed' },
      { id: '3', label: 'removed' },
      { id: '4', label: 'added' },
      { id: '5', label: 'replace' },
    ],
    placeHolder: 'select',
    name: 'DropDown',
    // defaultValue: 'selected',
    label: 'select',
  },
  render: (args) => (
    <BaseDropdown
      name={args.name}
      options={args.options}
      placeHolder={args.placeHolder}
      loading={args.loading}
      label={args.label}
      multiple={args.multiple}
      onChange={() => fn()}
    />
  ),
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ fontFamily: 'on', height: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};

const RenderDropdown: StoryFn<typeof BaseDropdown> = function RenderDropdown(
  args
) {
  const { loading, name, options, placeHolder, multiple } = args;

  return (
    <BaseDropdown
      loading={loading}
      name={name}
      options={options}
      placeHolder={placeHolder}
      multiple={multiple}
      onChange={fn()}
    />
  );
};

export const dropDown: StoryDropdown = {
  render: RenderDropdown,
  args: {
    loading: false,
  },
};

export default meta;
