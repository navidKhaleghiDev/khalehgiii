import PhList from '@iconify-icons/ph/list';
import { IconButton } from '@ui/atoms/BaseButton';
import { useDrawerContext } from '@context/drawer/drawerContext';

import { DrawerProfile } from '../DrawerProfile';

export function ListMenuContent() {
  const { isOpen, setIsOpen } = useDrawerContext();
  const toggleProfile = () => setIsOpen((prev) => !prev);

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
      {isOpen ? <DrawerProfile /> : null}
    </div>
  );
}
