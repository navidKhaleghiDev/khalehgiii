import { ReactElement } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import User from '@iconify-icons/ph/user';

import { UsersInfoCard } from './UsersInfoCard';

const meta = {
  title: 'molecules/UsersInfoCard',
  component: UsersInfoCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
              مولکول نمایش کارت اطلاعات کاربران و ادمین. از طریق بخش کنترل امکان تغییر در تایتل و شمارنده این مولکول وجود دارد.
              A Users and admin molecule. This molecule includes the ability to modify the title and counter via a control section, allowing dynamic updates to both the title and numerical display.
              `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    icon: User,
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
    count: {
      control: {
        type: 'number',
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },
  },
  decorators: [
    (Story): ReactElement => (
      <div
        style={{
          display: 'flex',
          width: '350px',
          direction: 'rtl',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UsersInfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * This UsersInfoCard displays.
 */
export const Default: Story = {
  args: {
    icon: User,
    title: 'ادمین',
    count: 40,
    iconColor: 'blue',
  },
};
