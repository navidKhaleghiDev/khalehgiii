import { ReactElement } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import FolderSimple from '@iconify-icons/ph/folder-simple';

import { DashboardCard } from './DashboardCard';

const meta = {
  title: 'molecules/DashboardCard',
  component: DashboardCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
              مولکول نمایش کارت داشبورد که در صفحه داشبورد مورد استفاده قرار میگیرد. از طریق بخش کنترل امکان تغییر در تایتل و شمارنده این مولکول وجود دارد.
              A DashboardCard molecule that is used within the dashboard page. This molecule includes the ability to modify the title and counter via a control section, allowing dynamic updates to both the title and numerical display.
              `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    icon: FolderSimple,
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
} satisfies Meta<typeof DashboardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const onClickHandle = () => {};

/**
 * This DashboardCard displays.
 */
export const Default: Story = {
  args: {
    icon: FolderSimple,
    title: 'فایل های آلوده',
    count: 40,
    onClick: onClickHandle,
  },
};
