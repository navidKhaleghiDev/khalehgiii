import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@context/settings/themeContext';

import { LicenseCard } from '.';
import { LicenseCardProps } from './types';

type StoryLicenseCard = StoryObj<typeof LicenseCard>;

const meta: Meta<typeof LicenseCard> = {
  title: 'molecules/LicenseCard',
  component: LicenseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'LicenseCard component that displays a title, date, and doughnut chart.',
      },
    },
  },
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <ThemeProvider>
        <div dir="rtl" style={{ fontFamily: 'kalameh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: [
        'blueLight',
        'blue',
        'red',
        'tealLight',
        'teal',
        'yellow',
        'purpleLight',
        'purple',
      ],
    },
  },
};
export default meta;

function RenderLicenseCard({
  title,
  date,
  subValue,
  totalValue,
  color,
  onClick,
}: LicenseCardProps) {
  return (
    <LicenseCard
      title={title}
      date={date}
      subValue={subValue}
      totalValue={totalValue}
      color={color}
      onClick={onClick}
    />
  );
}

export const licenseCard: StoryLicenseCard = {
  render: RenderLicenseCard,
  args: {
    title: 'مجوز هفتگی',
    date: '2024/10/01',
    subValue: 3,
    totalValue: 10,
    color: 'blueLight',
  },
};
