import { useRef } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { BaseDropdownMenuProps } from './type';

export function BaseDropdownMenu({
  buttonContent,
  content,
  className,
  isOpen,
  onClose,
}: BaseDropdownMenuProps) {
  const ref = useRef(null);

  useClickOutside({ ref, setValue: onClose, value: isOpen });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div role="button" tabIndex={0}>
        {buttonContent}
      </div>

      {isOpen && <div className="absolute mt-2 z-20">{content}</div>}
    </div>
  );
}
