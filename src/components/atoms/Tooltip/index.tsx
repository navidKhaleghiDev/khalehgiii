import React, { useState, useEffect } from 'react';
import { containerTooltipStyles, tooltipStyles } from './styles';
import { IToolTip } from './types';

function ToolTip({
  children,
  tooltip,
  position,
  skip,
}: IToolTip): JSX.Element | React.ReactNode {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShow(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (skip) {
    return children;
  }

  return (
    <div className="relative block">
      <div className={containerTooltipStyles({ position, show })}>
        <span className={tooltipStyles({ position })} />
        {tooltip}
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

export default ToolTip;
