import { Meta, StoryObj } from '@storybook/react';
import { LicenseCard } from '.';

const meta: Meta<typeof LicenseCard> = {
  title: 'atoms/LicenseCard',
  component: LicenseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The LicenseCard component displays a card with a title, date, and a doughnut chart. It supports customizable styles, click events, and dark mode.`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ fontFamily: 'kalameh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the card',
    },
    date: {
      control: 'text',
      description: 'Date displayed on the card',
    },
    subValue: {
      control: 'number',
      description:
        'Current value for the doughnut chart (e.g., completed part)',
    },
    totalValue: {
      control: 'number',
      description: 'Total value for the doughnut chart (e.g., total capacity)',
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['blue', 'red', 'teal', 'yellow', 'purple'],
      description: 'Color for the doughnut chart and date text',
    },
    dark: {
      control: 'boolean',
      description: 'Enable dark mode',
    },
    onClick: {
      action: 'clicked',
      description: 'Function to handle card click event',
    },
  },
  args: {
    title: 'License Title',
    date: '2023-10-07',
    subValue: 5,
    totalValue: 10,
    color: 'teal',
    dark: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'License Title',
    date: '2023-10-07',
    subValue: 5,
    totalValue: 10,
    color: 'blue',
    dark: false,
  },
};
