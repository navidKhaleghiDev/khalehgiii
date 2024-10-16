import { MemoryRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { UserContext } from '@context/user/userContext';
import { SideBar } from '.';

const meta: Meta<typeof SideBar> = {
  title: 'organisms/SideBar',
  parameters: {
    Layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sidebar',
      },
    },
  },
  component: SideBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: 'on',
          width: '20%',
          height: '100%',
          float: 'right',
        }}
        dir="rtl"
      >
        <MemoryRouter>
          <UserContext.Provider value={{ user: null, setUser: () => {} }}>
            <Story />
          </UserContext.Provider>
        </MemoryRouter>
      </div>
    ),
  ],
};
export default meta;

export function SideBarIndex() {
  return <SideBar />;
}
