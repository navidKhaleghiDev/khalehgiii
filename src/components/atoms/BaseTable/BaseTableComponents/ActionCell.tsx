/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
import { IconButton } from '@ui/atoms/BaseButton';

export function ActionCell({ row, head, onClick }: any) {
  return (
    <>
      {head?.action &&
        head.action.map((action: any, index: any) => (
          <IconButton
            key={index}
            {...action}
            onClick={() => onClick(action.action, row)}
          />
        ))}
    </>
  );
}
