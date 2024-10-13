import { useState } from 'react';

import { IconButtonBadge } from '@redesignUi/atoms/IconButtonBadge';
import PhBellSimpleRinging from '@iconify-icons/ph/bell-simple-ringing';
import PhBellSimple from '@iconify-icons/ph/bell-simple';
import { BaseDropdownMenu } from '@redesignUi/atoms/BaseDropdownMenu';
import { IconButton } from '@redesignUi/atoms/BaseButton';

import { NotificationMenuContent } from './NotificationMenuContent';

export function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <BaseDropdownMenu
        content={<NotificationMenuContent />}
        buttonContent={
          isOpen ? (
            <IconButton
              icon={PhBellSimple}
              size="md"
              onClick={handleToggle}
              color="neutral"
              className={`border-none dark:hover:!bg-gray-500 ${
                isOpen
                  ? '!bg-gray-200 text-gray-900 dark:!bg-gray-800 dark:text-gray-100 dark:border-none'
                  : 'bg-gray-100 hover:bg-gray-300 transition-all duration-200 ease-linear'
              }`}
            />
          ) : (
            <IconButtonBadge
              icon={PhBellSimpleRinging}
              size="md"
              onClick={handleToggle}
            />
          )
        }
      />
    </div>
  );
}
