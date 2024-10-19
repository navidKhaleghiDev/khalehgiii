import { useState } from 'react';

import PhList from '@iconify-icons/ph/list';
import { IconButton } from '@redesignUi/atoms/BaseButton';
// import { DrawerProfile } from './DrawerProfile/DrawerProfile';

export function ListMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleProfile = () => setIsOpen(!isOpen);

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
      {/* <div>
        <DrawerProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      </div> */}
    </div>
  );
}
