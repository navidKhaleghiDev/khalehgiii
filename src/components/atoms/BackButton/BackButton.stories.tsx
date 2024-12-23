import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { BackButton } from './BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'atoms/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `This BackButton component allows navigation to the previous page.
          `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn() },
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

export const CustomOnClick: Story = {
  args: {
    // eslint-disable-next-line no-alert
    onClick: () => alert('Custom onClick handler'),
    backToReferrer: false,
  },
};
