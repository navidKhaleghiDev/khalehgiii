import { BaseButton } from '@redesignUi/atoms';
import { useState, useRef } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import PhCaretDown from '@iconify-icons/ph/caret-down';
import PhCaretUp from '@iconify-icons/ph/caret-up';
import { useLanguage } from '@context/settings/languageContext';

export function GroupManagementDropDown({
  onClick,
  options,
  defaultValue,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const { isFarsi } = useLanguage();
  const ref = useRef(null);
  useClickOutside({ ref, setValue: setIsOpen, value: isOpen });

  const menuStyle = isFarsi ? 'left-0' : 'right-0';

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: any) => {
    setSelected(option);
    setIsOpen(false);
    if (onClick) {
      onClick(option);
    }
  };

  return (
    <div ref={ref} className="relative">
      <BaseButton
        className="w-full h-[22px] border-none sm:h-10 sm:border sm:border-gray-200"
        type="neutral"
        label={selected.label}
        onClick={toggleDropdown}
        endIcon={isOpen ? PhCaretUp : PhCaretDown}
      />

      {isOpen && (
        <div
          className={`z-20 absolute top-10 ml-5 ltr:mr-5 ${menuStyle} bg-white dark:bg-gray-700 shadow-md rounded-lg w-44 flex-col`}
        >
          {options.map((option: any) => (
            <BaseButton
              label={option.label}
              type="neutral"
              className="flex dark:bg-gray-700 !bg-gray-50 hover:!bg-gray-200 gap-2 !justify-start border-none !font-normal w-full !text-sm !text-right dark:hover:!bg-gray-500"
              key={option.label}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
