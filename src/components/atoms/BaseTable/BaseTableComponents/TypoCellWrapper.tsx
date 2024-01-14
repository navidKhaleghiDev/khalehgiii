import React from 'react';
import { Typography } from '@ui/atoms/Typography';
import { HeaderItem } from '../BaseTableTypes';

interface TypoCellWrapperProps {
  children: React.ReactNode;
  head: HeaderItem;
}

export function TypoCellWrapper({ children, head }: TypoCellWrapperProps) {
  const sizeCondition: HeaderItem['size'] = head?.size || 'body3';
  return (
    <Typography
      size={sizeCondition}
      type="div"
      className="text-xl whitespace-no-wrap break-all"
    >
      {children}
    </Typography>
  );
}
