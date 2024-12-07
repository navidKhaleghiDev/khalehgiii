import { useState } from 'react';
import { containerTooltipStyles, tooltipStyles } from './styles';
import { PopoverProps } from './types';

export function Popover({ children, position }: PopoverProps): JSX.Element {
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
