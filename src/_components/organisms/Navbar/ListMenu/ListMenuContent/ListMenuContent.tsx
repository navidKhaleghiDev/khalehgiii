import PhList from '@iconify-icons/ph/list';
import { IconButton } from '@redesignUi/atoms/BaseButton';

import { useDrawerContext } from '@context/drawer/drawerContext';
import { DrawerProfile } from '../DrawerProfile';

export function ListMenuContent() {
  const { isOpen, setIsOpen } = useDrawerContext();
  const toggleProfile = () => setIsOpen((prev) => !prev);
  console.log(isOpen, 'test');

  return (
    <div>
      <IconButton
        size="md"
        type="button"
        color="neutralNoBg"
        icon={PhList}
        className="transition-all duration-700 ease-linear"
        onClick={toggleProfile}
      />
      {isOpen && <DrawerProfile />}
    </div>
  );
}