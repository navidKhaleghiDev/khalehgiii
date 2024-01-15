import React from 'react';
import { Typography } from '@ui/atoms/Typography';
import ToolTip from '@ui/atoms/Tooltip';

export function UserCell({ row, id, head }: any) {
  const username = id.map((i, index) => (
    <React.Fragment key={i[index]}>
      {index > 0 && ' '}
      <span className="">{row[i]}</span>
    </React.Fragment>
  ));
  return (
    <ToolTip position="bottom" tooltip={username}>
      <Typography
        size={head?.size ? head?.size : 'body3'}
        type="div"
        className="max-h-14"
      >
        {username}
      </Typography>
    </ToolTip>
  );
}
