import { useState } from 'react';
import { BaseIcon } from '@ui/atoms';
import { AccordionProps } from './types';
import { titleStyles, contentStyles } from './styles';

/**
 * This Accordion component allows for expandable and collapsible content sections.
 * It takes a title and content, and toggles the display of the content when the title is clicked.
 *
 * @component
 *
 * @param {Object} props - The properties for the accordion component.
 * @param {string} props.title - The title of the accordion.
 * @param {string} props.id - The unique identifier for the accordion.
 * @param {React.ReactNode} props.content - The content to display inside the accordion.
 * @param {string} props.classNameTittle - Additional class names for the title.
 * @param {string} props.classNameContent - Additional class names for the content.
 *
 * @returns {JSX.Element} The accordion component.
 */

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
          icon="iconamoon:arrow-left-2-light"
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
