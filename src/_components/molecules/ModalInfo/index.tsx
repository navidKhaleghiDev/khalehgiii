import { useRef } from 'react';

import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { BaseIcon, Typography } from '@redesignUi/atoms';
import X from '@iconify-icons/ph/x';

import { ModelInfoProps } from '../Modal/types';

export function ModalInfo(props: ModelInfoProps): JSX.Element | null {
  const { open, setOpen, classContainer, icon, title, description, content } =
    props;
  const ref = useRef(null);
  useClickOutside({ ref, setValue: setOpen, value: open });
  const handleToggle = () => setOpen(!open);

  return open ? (
    <div className="fixed w-full h-100 inset-0 z-50 animated fadeIn overflow-hidden flex justify-center items-center backdrop-blur-sm">
      <div
        ref={ref}
        className={`rounded-[1.25rem] w-[350px] md:w-[634px] shadow-lg bg-white dark:bg-gray-700 mx-auto z-50 overflow-y-auto ${classContainer}`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="border p-3 border-gray-200 dark:border-gray-500 rounded-lg shadow-sm">
                <BaseIcon
                  icon={icon}
                  size="md"
                  className="text-gray-500 dark:text-gray-400"
                />
              </div>
              <div className="flex flex-col text-start">
                <Typography color="neutralDark" variant="body3B">
                  {title}
                </Typography>
                {description && (
                  <Typography color="neutralMiddle" variant="body5">
                    {description}
                  </Typography>
                )}
              </div>
            </div>
            <IconButton
              icon={X}
              color="neutralNoBg"
              onClick={handleToggle}
              size="md"
            />
          </div>
          {content && <div>{content}</div>}
        </div>
      </div>
    </div>
  ) : null;
}
