import { useRef, useState } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { BaseDropdownMenuProps } from './type';

export function BaseDropdownMenu({
  buttonContent,
  content,
  className,
}: BaseDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useClickOutside({ ref, setValue: setIsOpen, value: isOpen });
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="mx-[0.313rem]">
        <div
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleToggle();
            }
          }}
        >
          {buttonContent}
        </div>
      </div>

      {isOpen && <div className="absolute mt-2 z-20">{content}</div>}
    </div>
  );
}
