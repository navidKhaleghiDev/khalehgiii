import { useState } from 'react';
import { IconButtonBadge } from '@ui/atoms/IconButtonBadge';
import PhBellSimpleRinging from '@iconify-icons/ph/bell-simple-ringing';
import PhBellSimple from '@iconify-icons/ph/bell-simple';
import { BaseDropdownMenu } from '@ui/atoms/BaseDropdownMenu';
import { NotificationMenuContent } from './NotificationMenuContent';

export function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <BaseDropdownMenu
        content={<NotificationMenuContent />}
        buttonContent={
          isOpen ? (
            <IconButtonBadge
              icon={PhBellSimple}
              size="md"
              onClick={handleToggle}
              color="neutral"
              className="!bg-gray-200 text-gray-900 dark:!bg-gray-800 dark:text-gray-100 dark:border-none"
            />
          ) : (
            <IconButtonBadge
              icon={PhBellSimpleRinging}
              size="md"
              content={12}
              onClick={handleToggle}
              className="bg-gray-100 hover:bg-gray-300 "
            />
          )
        }
        isOpen={isOpen}
        onClose={handleClose}
      />
    </div>
  );
}
