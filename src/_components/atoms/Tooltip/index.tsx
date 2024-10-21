import { PropsWithChildren, useState } from 'react';

import { containerTooltipStyles, tooltipStyles } from './styles';
import { ToolTipProps } from './types';

/**
 *
 * This component provides a tooltip that appears when the user hovers over the element.
 *
 * @param {ToolTipProps} props The props for ToolTip component.
 * @param {PropsWithChildren} props.children The child elements that trigger the tooltip on hover.
 * @param {string} props.tooltip The content to be displayed inside the tooltip.
 * @param {'top'|'right'|'bottom'|'left'|'topStart'|'topEnd'|'bottomStart'|'bottomEnd'} props.position The position of the tooltip relative to the child elements.
 * @param {boolean} props.truncate If true, the tooltip text will be truncated with ellipsis if it exceeds the maximum width.
 * @returns {JSX.Element} The rendered ToolTip component.
 */

function ToolTip(props: PropsWithChildren<ToolTipProps>): JSX.Element {
  const { children, tooltip, position, truncate } = props;
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block group">
      <div className={containerTooltipStyles({ position, show, truncate })}>
        <span className={tooltipStyles({ position })} />
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

export default ToolTip;
