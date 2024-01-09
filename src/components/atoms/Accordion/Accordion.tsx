import { useState } from 'react';
import { BaseIcon } from '@ui/atoms';
import { AccordionProps } from './types';
import { titleStyles, contentStyles } from './styles';
import arrowLeftIcon from '@iconify-icons/ph/arrow-left';

export function Accordion({
  title,
  id,
  content,
  classNameTittle,
  classNameContent,
}: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  const handleToggle = () => {
    setOpen(open === id ? null : id);
  };

  return (
    <>
      <button
        type="button"
        className={titleStyles({
          className: classNameTittle,
        })}
        onClick={handleToggle}
      >
        <BaseIcon
          icon={arrowLeftIcon}
          className={`${open ? '-rotate-90' : ''} mx-2`}
        />
        <div>{title}</div>
      </button>
      {open && (
        <div className={contentStyles({ className: classNameContent })}>
          {content}
        </div>
      )}
    </>
  );
}
