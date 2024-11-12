import { PropsWithChildren, useEffect, useState } from 'react';

import { useLanguage } from '@context/settings/languageContext';

import { containerTooltipStyles, tooltipStyles } from './styles';
import { ToolTipProps } from './types';

export function ToolTip(props: PropsWithChildren<ToolTipProps>): JSX.Element {
  const { children, tooltip, position, truncate } = props;
  const [show, setShow] = useState(false);
  const { lang } = useLanguage();

  const direction = lang === 'fa' ? 'right' : 'left';
  const tooltipPosition =
    position === 'right' || position === 'left' ? direction : position;

  useEffect(() => {
    const handleClickOutside = () => {
      setShow(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block group">
      <div
        className={containerTooltipStyles({
          position: tooltipPosition,
          show,
          truncate,
        })}
      >
        <span className={tooltipStyles({ position: tooltipPosition })} />
        <div
          className={`whitespace-nowrap ${
            truncate ? 'overflow-hidden max-w-xs text-ellipsis' : ''
          }`}
        >
          {tooltip}
        </div>
      </div>
      <div
        onPointerEnter={() => setShow(true)}
        onPointerLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
