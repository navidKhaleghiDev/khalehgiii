import { BaseButton } from '@redesignUi/atoms';
import { useState, useEffect, useRef } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import PhCaretDown from '@iconify-icons/ph/caret-down';
import PhCaretUp from '@iconify-icons/ph/caret-up';
import { useLanguage } from '@context/settings/languageContext';

function DropDownHelperCell({ onClick, options, defaultValue }: any) {
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
          className={`z-20 absolute ${menuStyle}  bg-white dark:bg-gray-600 border border-gray-200 rounded-lg shadow w-[200px] flex-col`}
        >
          {options.map((option: any) => (
            <div
              className="cursor-pointer p-1 px-3 flex gap-3 !justify-start border-none h-6 w-full font-light leading-none bg-white text-gray-500 border-[0.063rem] border-gray-200
        hover:bg-gray-100 hover:text-gray-600 text-sm "
              key={option}
              role="button"
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(option);
                  e.preventDefault();
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDownHelperCell;
