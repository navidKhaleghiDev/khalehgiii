import { useRef } from 'react';

import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { BaseIcon, Typography } from '@ui/atoms';
import { BaseButton, IconButton } from '@ui/atoms/BaseButton';
import X from '@iconify-icons/ph/x';
import Check from '@iconify-icons/ph/check';
import TrashSimple from '@iconify-icons/ph/trash-simple';
import FloppyDisk from '@iconify-icons/ph/floppy-disk';
import Home from '@iconify-icons/ph/house';

import { containerStyles, headerStyles } from './styles';
import { ModalProps, IconHeader } from './types';

/**
 * Returns the icon and color based on the modal type.
 *
 * @param {ModalProps['type']} type - The type of the modal (e.g., 'error', 'success', 'info' , ...).
 * @returns {IconHeader} An object containing the icon and color.
 */
function iconHeader(type: ModalProps['type']): IconHeader {
  switch (type) {
    case 'error':
      return {
        icon: TrashSimple,
        color: 'text-red-600 bg-red-200 dark:text-red-400 dark:bg-gray-800',
      };
    case 'success':
      return {
        icon: Check,
        color: 'text-teal-500 bg-teal-200 dark:text-teal-400 dark:bg-gray-800',
      };
    case 'info':
      return {
        icon: FloppyDisk,
        color: 'text-gray-500 bg-gray-200 dark:text-gray-400 dark:bg-gray-800',
      };
    default:
      return {
        icon: Home,
        color: 'text-gray-500 bg-gray-200 dark:text-gray-400 dark:bg-gray-800',
      };
  }
}

/**
 * Modal Component
 *
 * A component to display a modal dialog with customizable content, buttons, and styles.
 *
 * @component
 *
 * @param {Object} props - The props for the Modal component.
 * @param {boolean} props.open - Determines if the modal is open or closed.
 * @param {Function} props.setOpen - Function to toggle the modal open/close state.
 * @param {'noneIcon' | 'error' | 'success' | 'content'} props.type - Type of modal (error, success, none).
 * @param {string} props.title - Title text displayed at the top of the modal.
 * @param {Object} buttonOne - Configuration for the first button in the modal.
 * @param {string} buttonOne.label - Label text for the first button.
 * @param {Function} buttonOne.onClick - Function to handle click events on the first button.
 * @param {boolean} buttonOne.loading - Determines if the first button is in a loading state.
 * @param {Object} buttonTow - Configuration for the second button in the modal.
 * @param {string} buttonTow.label - Label text for the second button.
 * @param {Function} buttonTow.onClick - Function to handle click events on the second button.
 * @param {boolean} buttonTow.loading - Determines if the second button is in a loading state.
 * @param {JSX.Element} props.content - Custom JSX content to display within the modal.
 * @param {string} props.description - Additional description text displayed in the modal.
 * @param {string} [props.classContainer] - Custom className for the modal container.
 *
 * @returns {JSX.Element | null} Returns the rendered modal component or null if not open.
 */

export function Modal(props: ModalProps): JSX.Element | null {
  const {
    open,
    setOpen,
    size,
    type,
    title,
    buttonOne,
    buttonTow,
    content,
    description,
    classContainer,
  } = props;
  const ref = useRef(null);
  useClickOutside({ ref, setValue: setOpen, value: open });
  const handleToggle = () => setOpen(!open);

  return open ? (
    <div className="main-modal fixed w-full h-100 inset-0 z-50 animated fadeIn overflow-hidden flex justify-center items-center backdrop-blur-sm">
      <div
        ref={ref}
        className={`rounded-[1.25rem] shadow-lg modal-container bg-white dark:bg-neutral-600 ${containerStyles(
          { size }
        )} mx-auto z-50 overflow-y-auto ${classContainer}`}
      >
        <div className="modal-content text-center min-h-[12rem]">
          <div className="flex items-center justify-between h-12 box-content p-5 flex-row">
            {type !== 'content'
              ? type !== 'noneIcon' && (
                  <div
                    className={`${headerStyles({
                      type,
                    })}`}
                  >
                    <BaseIcon
                      icon={iconHeader(type)?.icon}
                      className={`rounded-full p-2 box-content ${
                        iconHeader(type)?.color
                      }`}
                      size="md"
                    />
                  </div>
                )
              : title && (
                  <Typography
                    variant="body3"
                    color="neutralDark"
                    weight="medium"
                    className="rtl:text-right ltr:text-left"
                  >
                    {title}
                  </Typography>
                )}
            <div className="modal-close cursor-pointer z-50">
              <IconButton
                icon={X}
                onClick={handleToggle}
                classNameIcon="h-6 w-6 text-gray-500 dark:text-gray-300"
                color="neutralNoBg"
              />
            </div>
          </div>
          <div className="p-5 pt-0 m-auto sm:max-w-none">
            {title && type !== 'content' && (
              <Typography
                variant="body3"
                color="neutralDark" // change color neutralDark to text-gray-900 after merge typography branch
                className="rtl:text-right ltr:text-left font-semibold leading-7"
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body5"
                color="neutral"
                weight="normal"
                className="rtl:text-right ltr:text-left leading-6"
              >
                {description}
              </Typography>
            )}
            {content && (
              <div className="flex justify-center items-center">{content}</div>
            )}
            {(buttonOne || buttonTow) && (
              <div className="flex pt-5 gap-5 rtl:flex-row rtl:justify-end ltr:flex-row-reverse ltr:justify-start">
                {buttonOne && (
                  <BaseButton
                    label={buttonOne.label}
                    onClick={buttonOne.onClick}
                    type={buttonOne.color}
                    loading={buttonOne.loading}
                    size={buttonOne.size}
                    className={
                      buttonOne.size ?? 'sm:h-10 sm:w-40 h-10 w-[11.88rem]'
                    }
                  />
                )}
                {buttonTow && (
                  <BaseButton
                    label={buttonTow.label}
                    onClick={buttonTow.onClick}
                    loading={buttonTow.loading}
                    type={buttonTow.color}
                    size={buttonTow.size}
                    className={buttonTow.size ?? 'h-10 w-[5.94rem]'}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
