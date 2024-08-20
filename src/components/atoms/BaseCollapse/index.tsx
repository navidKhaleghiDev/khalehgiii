import { ReactElement, useState } from 'react';
import PhCaretUp from '@iconify-icons/ph/caret-up';
import PhCaretDown from '@iconify-icons/ph/caret-down';
import { IconButton } from '../BaseButton';

type TBaseCollapse = {
  content: ReactElement;
};

export function BaseCollapse({ content }: TBaseCollapse) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" border border-gray-300 rounded-md mb-4 col-span-6 ">
      <IconButton
        onClick={toggleCollapse}
        className=" flex justify-between items-center p-4 text-left bg-white-100 hover:bg-gray-200 focus:outline-none w-full"
        icon={!isOpen ? PhCaretDown : PhCaretUp}
      />

      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {content && <div className="overflow-y-auto max-h-30 ">{content}</div>}
      </div>
    </div>
  );
}
