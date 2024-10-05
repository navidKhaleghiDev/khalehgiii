import { useState } from 'react';
import { containerTooltipStyles, tooltipStyles } from './styles';
import { IPopover } from './types';

export function Popover({ children, position }: IPopover): JSX.Element {
  const [show, setShow] = useState(false);
  return (
    <div className="group relative inline-block">
      <div className={containerTooltipStyles({ position, show })}>
        <span className={tooltipStyles({ position })} />
        tooltip
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
