import React from 'react';
import { Typography } from '@ui/atoms/Typography';
import { IComponentTable } from '../../types';

export function UserCell({ row, id, header }: IComponentTable) {
  const username = id.map((i: string, index: number) => (
    <React.Fragment key={i[index]}>
      {index > 0 && ' '}
      <span className="">{row[i]}</span>
    </React.Fragment>
  ));

  return (
    <Typography
      variant={header?.variant ? header?.variant : 'body4'}
      type="div"
      className="max-h-14"
    >
      {row[id] ? username : '--'}
    </Typography>
  );
}
