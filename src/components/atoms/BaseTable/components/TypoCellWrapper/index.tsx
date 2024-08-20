import React from 'react';
import { Typography } from '@ui/atoms/Typography';
import { IHeaderTable } from '../../types';

interface TypoCellWrapperProps {
  children: React.ReactNode;
  header: IHeaderTable;
}

export function TypoCellWrapper({ children, header }: TypoCellWrapperProps) {
  const sizeCondition: IHeaderTable['variant'] = header?.variant || 'body3';
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
