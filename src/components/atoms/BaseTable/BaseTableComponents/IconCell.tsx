import React from 'react';
import { BaseIcon } from '@ui/atoms';
import { TableCell, HeaderItem } from '../BaseTableTypes';
import { TypoCellWrapper } from './TypoCellWrapper';

interface IconCellProps extends TableCell {
  head: HeaderItem & {
    icon: React.ComponentType;
    color?: string[];
  };
}

export function IconCell({ row, id, head }: IconCellProps) {
  return head && head.icon ? (
    <TypoCellWrapper head={head}>
      {!Array.isArray(head.icon) ? (
        React.createElement(head.icon, {
          bgColor:
            id !== undefined && (row as Record<string, any>)?.[id]
              ? head.color?.[0]
              : head.color?.[1],
        } as any) // Type assertion here
      ) : (
        <BaseIcon
          icon={
            id !== undefined && (row as Record<string, any>)?.[id]
              ? head.icon[0]
              : head.icon[1]
          }
          color={
            id !== undefined && (row as Record<string, any>)?.[id]
              ? 'red'
              : 'teal'
          }
        />
      )}
    </TypoCellWrapper>
  ) : null;
}
