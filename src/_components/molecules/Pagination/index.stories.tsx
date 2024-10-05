import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Pagination } from './index';

const meta: Meta<typeof Pagination> = {
  title: 'molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `This IconButton component renders a button with an icon.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
  },
  args: {
    onPageChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
  },
};
