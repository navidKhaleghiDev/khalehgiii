import React from 'react';
import { Typography } from '@ui/atoms/Typography';
import { IHeaderTable } from '../../types';

interface TypoCellWrapperProps {
  children: React.ReactNode;
  header: IHeaderTable;
}

export function TypoCellWrapper({ children, header }: TypoCellWrapperProps) {
  const sizeCondition: IHeaderTable['size'] = header?.size || 'body3';
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
