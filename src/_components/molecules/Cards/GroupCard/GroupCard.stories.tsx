import { ReactElement } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { GroupCard } from './GroupCard';

const meta = {
  title: 'molecules/GroupCard',
  component: GroupCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `از طریق بخش کنترل امکان تغییر در تایتل و جزییات این مولکول وجود دارد.
              This molecule includes the ability to modify the title and counter via a details section, allowing dynamic updates to both the title and details display.
              `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story): ReactElement => (
      <div
        style={{
          fontFamily: 'font-kalameh',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GroupCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'بازرگانی',
    details: [
      {
        id: 1,
        title: 'کاربر',
        number: 5,
      },
      {
        id: 2,
        title: 'کاربران آنلاین',
        number: 15,
      },
      {
        id: 3,
        title: 'ادمین',
        number: 7,
      },
    ],
    onClick: () => {},
  },
};
