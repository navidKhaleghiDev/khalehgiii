import { useForm } from 'react-hook-form';
import { fn } from '@storybook/test';
import { type Meta, StoryFn, StoryObj } from '@storybook/react';
import { BaseSelect } from '.';

// Custom Types for storyBook

type StoryBaseSelect = StoryObj<typeof BaseSelect>;

// Main instruction for story
const meta: Meta<typeof BaseSelect> = {
  title: 'atoms/inputs/BaseSelect',
  component: BaseSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BaseSelect',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onClickIcon: fn(),
    pureOnChange: fn(),
    name: 'select',
    id: 'select',
    placeholder: 'انتخاب',
    intent: 'default',
  },
  argTypes: {
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
    <BaseSelect
      name={args.name}
      id={args.id}
      placeholder={args.placeholder}
      label={args.label}
      intent={args.intent}
      size={args.size}
      control={args.control}
      className={args.className}
      defaultValue={args.defaultValue}
      endIcon={args.endIcon}
      rules={args.rules}
      startIcon={args.startIcon}
      pureValue={args.pureError}
      ltrLabel={args.ltrLabel}
      ltrPlaceHolder={args.ltrPlaceHolder}
      fullWidth={args.fullWidth}
      hiddenError={args.hiddenError}
      iconButtonIcon={args.iconButtonIcon}
      pureError={args.pureError}
      onClickIcon={args.onClickIcon}
      pureOnChange={args.pureOnChange}
      setError={args.setError}
      selectOptions={[
        { id: 1, label: 'item one', value: 'item one' },
        { id: 2, label: 'item two', value: 'item two' },
        { id: 3, label: 'item tree', value: 'item tree' },
      ]}
    />
  ),
};

// to use this component we need to add function because of
// control of useForm hook
const RenderBaseSelect: StoryFn<typeof BaseSelect> = function RenderBaseSelect(
  args
) {
  const {
    id,
    name,
    placeholder,
    fullWidth,
    ltrPlaceHolder,
    intent,
    pureOnChange,
    defaultValue,
    endIcon,
    hiddenError,
    label,
    size,
    ltrLabel,
    setError,
    startIcon,
    onClickIcon,
    pureError,
    iconButtonIcon,
    rules,
  } = args;
  const { control } = useForm();
  return (
    <BaseSelect
      control={control}
      id={id}
      name={name}
      ltrPlaceHolder={ltrPlaceHolder}
      placeholder={placeholder}
      fullWidth={fullWidth}
      size={size}
      pureOnChange={pureOnChange}
      intent={intent}
      selectOptions={[
        { id: 1, label: 'item one', value: 'item one' },
        { id: 2, label: 'item two', value: 'item two' },
        { id: 3, label: 'item tree', value: 'item tree' },
      ]}
      label={label}
      defaultValue={defaultValue}
      endIcon={endIcon}
      rules={rules}
      startIcon={startIcon}
      pureValue={pureError}
      ltrLabel={ltrLabel}
      hiddenError={hiddenError}
      iconButtonIcon={iconButtonIcon}
      pureError={pureError}
      onClickIcon={onClickIcon}
      setError={setError}
    />
  );
};

// stories that are base on size & intent
export const optionInputDefault: StoryBaseSelect = {
  render: RenderBaseSelect,
  args: {
    id: 'sort-as',
    name: 'sortAs',
    placeholder: 'بنویسید',
  },
};
export default meta;
