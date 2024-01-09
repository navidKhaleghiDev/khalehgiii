import { useRef } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import shieldWarningIcon from '@iconify-icons/ph/shield-warning';
import shieldCheckIcon from '@iconify-icons/ph/shield-check';
import xIcon from '@iconify-icons/ph/x';

import { BaseIcon, Typography } from '@ui/atoms';
import { BaseButton, IconButton } from '@ui/atoms/BaseButton';
import { containerStyles, contentStyles, headerStyles } from './styles';
import { IModal } from './types';

export function Modal({
  open,
  setOpen,
  type,
  title,
  buttonOne,
  buttonTow,
  content,
  description,
  classContainer,
  freeSize,
}: IModal) {
  const ref = useRef(null);
  useClickOutside({ ref, setValue: setOpen, value: open });
  const handleToggle = () => setOpen(!open);

  return open ? (
    <div
      className={`main-modal fixed w-full h-100 inset-0 z-50 animated fadeIn faster main-modal  h-100  overflow-hidden flex justify-center items-center `}
      style={{ background: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div
        ref={ref}
        className={containerStyles({
          className: classContainer,
          freeSize,
        })}
      >
        <div className={contentStyles({ type })}>
          {type !== 'none' && (
            <div className={headerStyles({ type })}>
              <div className="modal-close cursor-pointer z-50">
                <IconButton
                  icon={xIcon}
                  onClick={handleToggle}
                  classNameIcon="h-8 w-8 text-neutral-100"
                />
              </div>
              <BaseIcon
                icon={type === 'error' ? shieldWarningIcon : shieldCheckIcon}
                className="h-8 w-8 text-neutral-100"
              />
            </div>
          )}
          {title && (
            <Typography size="body2" color="neutral" className="mt-6">
              {title}
            </Typography>
          )}
          {description && (
            <Typography size="body3" color="neutral">
              {description}
            </Typography>
          )}
          {content && (
            <div className="flex justify-center items-center">{content}</div>
          )}
          {(buttonOne || buttonTow) && (
            <div className="flex justify-center py-2">
              {buttonOne && (
                <BaseButton
                  label={buttonOne.label}
                  onClick={buttonOne.onClick}
                  type={buttonOne.color}
                  className="m-1"
                  loading={buttonOne.loading}
                />
              )}
              {buttonTow && (
                <BaseButton
                  label={buttonTow.label}
                  onClick={buttonTow.onClick}
                  loading={buttonTow.loading}
                  type={buttonTow.color}
                  className="m-1"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
