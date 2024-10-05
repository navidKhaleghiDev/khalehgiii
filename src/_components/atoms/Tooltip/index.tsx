import { useState } from 'react';

import { containerTooltipStyles, tooltipStyles } from './styles';
import { ToolTipProps } from './types';

/**
 * ToolTip component
 *
 * This component provides a tooltip that appears when the user hovers over the element.
 *
 * @component
 *
 * @param {ToolTipProps} props - The props for ToolTip component.
 * @param {React.ReactNode} props.children - The child elements that trigger the tooltip on hover.
 * @param {string} props.tooltip - The content to be displayed inside the tooltip.
 * @param {'top'|'right'|'bottom'|'left'|'topStart'|'topEnd'|'bottomStart'|'bottomEnd'} props.position - The position of the tooltip relative to the child elements.
 *
 * @returns {JSX.Element} The rendered ToolTip component.
 */

function ToolTip({ children, tooltip, position }: ToolTipProps): JSX.Element {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block group">
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
