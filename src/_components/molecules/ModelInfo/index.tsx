import { useRef } from 'react';

import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { BaseIcon } from '@redesignUi/atoms';
import PhMagnifyingGlass from '@iconify-icons/ph/magnifying-glass';

import { ModalProps } from '../Modal/types';

export function ModalInfo(props: ModalProps): JSX.Element | null {
  const { open, setOpen, classContainer } = props;
  const ref = useRef(null);
  useClickOutside({ ref, setValue: setOpen, value: open });
  // const handleToggle = () => setOpen(!open);

  return open ? (
    <div className="fixed w-full h-100 inset-0 z-50 animated fadeIn overflow-hidden flex justify-center items-center backdrop-blur-sm">
      <div
        ref={ref}
        className={`rounded-[1.25rem] shadow-lg modal-container bg-white dark:bg-neutral-600 mx-auto z-50 overflow-y-auto ${classContainer}`}
      >
        <div className="text-center p-5">
          <div>
            <div className="border p-3 border-gray-200 rounded-lg shadow-sm">
              <BaseIcon icon={PhMagnifyingGlass} size="md" color="neutral" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
