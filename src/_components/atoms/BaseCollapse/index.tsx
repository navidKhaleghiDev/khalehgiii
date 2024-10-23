import { ReactElement, useState } from 'react';

import PhCaretLeft from '@iconify-icons/ph/caret-left';
import PhCaretRight from '@iconify-icons/ph/caret-right';
import PhCaretDown from '@iconify-icons/ph/caret-down';
import { Typography } from '@redesignUi/atoms';
import { useLanguage } from '@context/settings/languageContext';
import { IconButton } from '@redesignUi/atoms/BaseButton';

type TBaseCollapse = {
  content: ReactElement;
  title?: string;
  className?: string;
};

export function BaseCollapse({ content, title, className }: TBaseCollapse) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const dir = lang === 'fa' ? PhCaretLeft : PhCaretRight;
  return (
    <div className={className ?? ''}>
      <div
        className={`flex justify-between items-center border border-gray-100 hover:bg-gray-100 h-10 px-5 rounded-lg ${
          isOpen && 'bg-gray-100'
        }`}
      >
        {title && (
          <Typography variant="body6" color="neutralDark">
            {title}
          </Typography>
        )}
        <IconButton
          color="neutralNoBg"
          icon={!isOpen ? dir : PhCaretDown}
          onClick={toggleCollapse}
        />
      </div>
      <div
        className={`transition-max-height duration-75 ease-out overflow-hidden px-5 rounded-lg ${
          isOpen
            ? 'max-h-10 mt-[0.12rem]  border border-gray-100 bg-gray-100 '
            : 'h-0'
        }`}
      >
        {content && <div>{content}</div>}
      </div>
    </div>
  );
}
