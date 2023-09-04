/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { BaseIcon, Typography } from '@ui/atoms';
import { AccordionButtonProps } from './types';
import { titleStyles, contentStyles } from './styles';

export function AccordionButton({ open, setOpen, item }: AccordionButtonProps) {
  return (
    <>
      <button
        type="button"
        className={titleStyles({
          active: open === item.id,
        })}
        onClick={() => setOpen(open === item.id ? null : item.id)}
      >
        <BaseIcon
          icon="iconamoon:arrow-left-2-light"
          className={open === item.id ? '-rotate-90' : ''}
        />
        <Typography className="mr-3" size="body3">
          {item.title}
        </Typography>
      </button>
      <div
        className={contentStyles({
          active: open === item.id,
          className: `${open !== item.id && 'hidden'} `,
        })}
      >
        {item.content}
      </div>
    </>
  );
}
