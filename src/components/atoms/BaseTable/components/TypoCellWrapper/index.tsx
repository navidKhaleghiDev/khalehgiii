import React from 'react';
import { Typography } from '@ui/atoms/Typography';
import { HeaderTableProps } from '../../types';

interface TypoCellWrapperProps {
  children: React.ReactNode;
  header: HeaderTableProps;
}

export function TypoCellWrapper({ children, header }: TypoCellWrapperProps) {
  const sizeCondition: HeaderTableProps['variant'] = header?.variant || 'body3';
  return (
    <Typography
      variant={sizeCondition}
      type="div"
      className="text-xl whitespace-no-wrap break-all"
    >
      {children}
    </Typography>
  );
}
