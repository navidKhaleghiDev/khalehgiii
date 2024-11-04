import { ReactElement, useState } from 'react';

import PhCaretLeft from '@iconify-icons/ph/caret-left';
import PhCaretRight from '@iconify-icons/ph/caret-right';
import PhCaretDown from '@iconify-icons/ph/caret-down';
import { Typography } from '@redesignUi/atoms';
import { useLanguage } from '@context/settings/languageContext';
import { IconButton } from '@redesignUi/atoms/BaseButton';

type BaseCollapseProps = {
  content: ReactElement;
  title?: string;
  description?: string;
  className?: string;
};

export function BaseCollapse({
  content,
  title,
  className,
  description,
}: BaseCollapseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const dir = lang === 'fa' ? PhCaretLeft : PhCaretRight;
  return (
    <div className={className ?? ''}>
      <div
        className={`flex justify-between items-center border border-gray-100 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-600 h-10 px-5 rounded-lg ${
          isOpen && 'bg-gray-100 dark:bg-gray-800 dark:border-gray-800'
        }`}
      >
        <div>
          {title ? (
            <Typography variant="body6" color="neutralDark">
              {title}
            </Typography>
          ) : null}
          {description ? (
            <Typography
              className="text-[0.563rem] ltr:text-left rtl:text-right"
              color="neutralMiddle"
            >
              {description}
            </Typography>
          ) : null}
        </div>
        <IconButton
          color="neutralNoBg"
          icon={!isOpen ? dir : PhCaretDown}
          onClick={toggleCollapse}
        />
      </div>
      <div
        className={`transition-max-height duration-75 ease-out overflow-hidden sm:px-5 px-2 rounded-lg border border-gray-100 bg-gray-100 dark:bg-gray-800 ${
          isOpen ? 'mt-[0.12rem] dark:border-gray-800' : 'h-0 border-none'
        }`}
      >
        {content ? <div>{content}</div> : null}
      </div>
    </div>
  );
}
