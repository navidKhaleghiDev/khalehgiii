import { ReactElement } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta = {
  title: 'atoms/Notification',
  component: Notification,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
                نمایش نوتیفیکیشن اختصاصی که وضعیت های مختلف success و error دارد و در اندازه های مختلف قابل تنظیم است و از قسمت کنترل میتوان تغیییرات هر یک را بررسی کرد<div className=""></div>
                Displays a custom notification with success and error states, adjustable to various sizes. Changes can be reviewed from the control panel.
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
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg', 'fullWidth'],
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['success', 'error', 'default'],
    },
  },
  decorators: [
    (Story): ReactElement => (
      <div dir="rtl" className="font-kalameh">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * This notification displays success messages.
 */
export const Default: Story = {
  args: {
    type: 'success',
    size: 'fullWidth',
    title: 'ورود با موفقیت انجام شد.',
  },
};
