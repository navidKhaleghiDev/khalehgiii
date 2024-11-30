import { BaseButton } from '@redesignUi/atoms';
import { useState, useEffect, useRef } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import PhCaretDown from '@iconify-icons/ph/caret-down';
import PhCaretUp from '@iconify-icons/ph/caret-up';
import { useLanguage } from '@context/settings/languageContext';
import { DropDownHelperCellProps, IdItem } from '../../types';

/**
 * DropDown Helper Cell Component.
 *
 * This component renders a dropdown menu with customizable options and supports
 * dynamic selection. It is designed to be used within table cells or other UI elements
 * where dropdown functionality is required.
 *
 * @template T
 * @param {DropDownHelperCellProps<T>} props - The props for the dropdown helper cell.
 * @param {function} props.onClick - Callback triggered when a dropdown option is selected.
 * @param {Array<{ id: string | number, label: string, value: any }>} props.options - Array of dropdown options.
 * @param {{ id: string | number, label: string, value: any }} props.defaultValue - Default selected value for the dropdown.
 *
 * @returns {JSX.Element} - The rendered dropdown helper cell.
 */

function DropDownHelperCell<T extends IdItem>({
  onClick,
  options,
  defaultValue,
}: DropDownHelperCellProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const { isFarsi } = useLanguage();
  const ref = useRef(null);
  useClickOutside({ ref, setValue: setIsOpen, value: isOpen });

  const menuStyle = isFarsi ? 'left-0' : 'right-0';

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

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
          className={`z-20 absolute top-10 ml-5 ltr:mr-5 ${menuStyle} bg-white dark:bg-gray-600 shadow-md rounded-lg w-44 flex-col`}
        >
          {options.map((option: any) => {
            console.log(option);
            return (
              <BaseButton
                label={option.label}
                type="neutral"
                className="flex gap-2 !justify-start border-none !font-normal w-full !text-sm !text-right dark:hover:!bg-gray-500"
                key={option.label}
                onClick={() => handleOptionClick(option)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropDownHelperCell;
