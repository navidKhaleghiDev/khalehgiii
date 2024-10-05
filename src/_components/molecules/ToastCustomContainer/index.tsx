import Check from '@iconify-icons/ph/check';
import Warning from '@iconify-icons/ph/warning';
import Info from '@iconify-icons/ph/info';
import X from '@iconify-icons/ph/x';

import { BaseIcon } from '@redesignUi/atoms';

import {
  Flip,
  ToastContainer,
  ToastOptions,
  TypeOptions,
} from 'react-toastify';

import { toastIconStyle, toastStyle } from './styles';

interface ToastCustomContainerProps {
  dir?: 'rtl' | 'ltr';
  size?: 'sm' | 'md' | 'lg' | 'responsive';
}

type CustomTypeOptions = Exclude<TypeOptions, 'warning' | 'default'>;

interface CloseButtonProps {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
  type: CustomTypeOptions;
}

/**
 * Custom close button component for the toast notification.
 *
 * Renders a button with a close icon that, when clicked, closes the toast notification.
 *
 * @component
 *
 * @param {CloseButtonCustomProps} props - The props for the close button component.
 * @param {Function} props.closeToast - The function to close the toast notification.
 * @param {CustomTypeOptions} props.type - The type of the toast notification.
 *
 * @returns {JSX.Element} The rendered close button component.
 */
function CloseButton({ closeToast, type }: CloseButtonProps): JSX.Element {
  return (
    <button
      className="text-white self-center justify-start"
      onClick={closeToast}
      aria-label="Close"
      type="button"
    >
      <BaseIcon
        icon={X}
        color="neutral"
        size="md"
        className={`${toastIconStyle({ type })}`}
      />
    </button>
  );
}

/**
 * Returns the appropriate icon for the toast notification based on its type.
 *
 * @function
 *
 * @param {Object} [props] - The props for the icon component.
 * @param {CustomTypeOptions} [props.type] - The type of the toast notification.
 *
 * @returns {JSX.Element} The icon component or null if the type is not recognized.
 */
function getToastIcon(type: CustomTypeOptions = 'success'): JSX.Element {
  const toastIconMap = {
    success: {
      icon: Check,
      class: 'shrink-0 w-5 h-5',
    },
    error: {
      icon: Warning,
      class: 'shrink-0',
    },
    info: {
      icon: Info,
      class: 'shrink-0',
    },
  };

  return (
    <BaseIcon
      icon={toastIconMap[type].icon}
      size="md"
      color="neutral"
      className={`${toastIconMap[type].class} ${toastIconStyle({ type })}`}
    />
  );
}

/**
 * Returns the appropriate class name for the toast notification based on its direction, size, and type.
 *
 * @function
 *
 * @param {'rtl' | 'ltr'} dir - The direction of the layout, either 'rtl' or 'ltr'.
 * @param {'sm' | 'md' | 'lg' | 'responsive'} size - The size of the toast notification.
 * @param {CustomTypeOptions} [type='success'] - The type of the toast notification. Defaults to 'success'.
 *
 * @returns {string} The class name for the toast notification.
 */
function getToastClassName(
  dir: 'rtl' | 'ltr',
  size: 'sm' | 'md' | 'lg' | 'responsive',
  type: CustomTypeOptions = 'success'
) {
  return `flex items-center ${
    dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'
  } px-5 rounded-2xl shadow-lg font-kalameh text-base gap-7 toast-custom ${toastStyle(
    { typeToast: type }
  )} ${toastIconStyle({ size })}`;
}

const toastOptions: ToastOptions = {
  closeButton: (props) => {
    const { closeToast } = props;
    const customType = ['info', 'success', 'error'].includes(props.type)
      ? (props.type as CustomTypeOptions)
      : 'info';

    return <CloseButton closeToast={closeToast} type={customType} />;
  },
  closeOnClick: false,
  transition: Flip,
  hideProgressBar: true,
};

/**
 * ToastCustomContainer Component
 *
 * Renders a custom container for displaying toast notifications with custom icons,
 * styles, and settings based on the direction (`rtl` or `ltr`) and size options.
 *
 * @component
 *
 * @param {ToastCustomContainerProps} props - The props for the custom toast container.
 * @param {string} [props.dir='rtl'] - The direction of the layout, either 'rtl' or 'ltr'.
 * @param {string} [props.size='responsive'] - The size of the toast notification ('sm', 'md', 'lg', or 'responsive').
 *
 * @returns {JSX.Element} The rendered ToastContainer component.
 */
export function ToastCustomContainer({
  dir = 'rtl',
  size = 'responsive',
}: ToastCustomContainerProps): JSX.Element {
  return (
    <ToastContainer
      closeButton={toastOptions.closeButton}
      closeOnClick={toastOptions.closeOnClick}
      transition={toastOptions.transition}
      hideProgressBar={toastOptions.hideProgressBar}
      className={`toast-container-custom ${toastIconStyle({ size, dir })}`}
      toastClassName={(props) => {
        const customType =
          props?.type && ['info', 'success', 'error'].includes(props.type)
            ? (props.type as CustomTypeOptions)
            : undefined;
        return getToastClassName(dir, size, customType);
      }}
      bodyClassName={`${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'} ${
        size === 'sm' ? 'text-xs' : 'sm:text-lg text-xs'
      } text-left font-normal leading-7 gap-7 sm:p-1.5 toast-body-custom h-full overflow-hidden`}
      icon={(props) => {
        const customType =
          props?.type && ['info', 'success', 'error'].includes(props.type)
            ? (props.type as CustomTypeOptions)
            : undefined;
        return getToastIcon(customType);
      }}
      rtl={dir === 'rtl'}
    />
  );
}
