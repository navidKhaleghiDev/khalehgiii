import { Meta } from '@storybook/react';
import PencilSimple from '@iconify-icons/ph/pencil-simple';
import BellSimple from '@iconify-icons/ph/bell-simple';

import { IconButtonBadge } from './IconButtonBadge';
import { IconButtonBadgeProps } from './types';

const icons = {
  pencil: PencilSimple,
  bell: BellSimple,
};

const meta = {
  title: 'atoms/IconButtonBadge',
  component: IconButtonBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          از بخش کنترل امکان تغییر نام آیکون، رنگ و سایز، تعیین مقدار content و ... وجود دارد. 
          The control section, it is possible to change the icon name, color and size, determine the content value, etc.
                `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    icon: 'pencil',
    color: 'neutral',
    size: 'md',
    content: 20,
  },
  argTypes: {
    content: {
      control: {
        type: 'number',
      },
    },
    icon: {
      control: {
        type: 'select',
      },
      options: Object.keys(icons),
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'pencil' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md'],
    },
    color: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconButtonBadge>;

export default meta;

export function Default({
  content,
  className,
  classNameIcon,
  size,
  color,
  icon,
  disabled,
}: IconButtonBadgeProps) {
  const iconValue = icons[icon as keyof typeof icons];
  return (
    <IconButtonBadge
      content={content}
      className={className}
      classNameIcon={classNameIcon}
      size={size}
      color={color}
      icon={iconValue}
      disabled={disabled}
    />
  );
}
