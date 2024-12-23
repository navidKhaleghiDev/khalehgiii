import { ReactElement } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';
import { ModalProps } from './types';

const meta: Meta<ModalProps> = {
  title: 'molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          نمایش و عدم نمایش مودال‌ها و پیام‌های داخل هر مودال از قسمت کنترل قابل ویرایش است. 
          Controls the visibility and messages of modals, editable from the control panel.
        `,
      },
    },
  },
  decorators: [
    (Story): ReactElement => {
      return (
        <div
          style={{
            padding: '3em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '100vw',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  tags: ['autodocs'],
  args: {
    classContainer: 'font-kalameh',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['error', 'success', 'info', 'noneIcon'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'responsive'],
    },
    open: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ModalProps>;

const setModal = (): void => {};

const handleRequest = (): void => {};

export const Default: Story = {
  args: {
    open: true,
    type: 'success',
    size: 'md',
    title: 'ویرایش با موفقیت انجام شد',
    setOpen: setModal,
    buttonOne: {
      label: 'بله',
      onClick: handleRequest,
      color: 'teal',
      size: 'md',
    },
    buttonTow: {
      label: 'لغو',
      onClick: setModal,
      color: 'tertiary',
      size: 'sm',
    },
  },
};
