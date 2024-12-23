import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { LinkButton } from './index';

const meta: Meta<typeof LinkButton> = {
  title: 'atoms/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
        This LinkButton component combines a button with a link.
          `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['teal', 'inactive', 'red', 'tertiary', 'neutral'],
    },
    fullWidth: { control: 'boolean' },
  },
  args: {
    link: '/',
    label: 'Link ',
    size: 'md',
    type: 'teal',
    submit: false,
    disabled: false,
    loading: false,
    skip: false,
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ fontFamily: 'on' }}>
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
