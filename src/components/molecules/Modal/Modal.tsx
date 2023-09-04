import { useRef } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { BaseIcon, Typography } from '@ui/atoms';
import { BaseButton, IconButton } from '@ui/atoms/BaseButton';
import { contentStyles, headerStyles } from './styles';
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
        className={`rounded-lg shadow-lg modal-container bg-white w-[36rem] mx-auto z-50 overflow-y-auto ${classContainer}`}
      >
        <div className={contentStyles({ type })}>
          {type !== 'none' && (
            <div className={headerStyles({ type })}>
              <div className="modal-close cursor-pointer z-50">
                <IconButton
                  icon="iconamoon:close-bold"
                  onClick={handleToggle}
                  classNameIcon="h-8 w-8 text-neutral-100"
                />
              </div>
              <BaseIcon
                icon={
                  type === 'error'
                    ? 'ph:shield-warning'
                    : 'material-symbols:check'
                }
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
