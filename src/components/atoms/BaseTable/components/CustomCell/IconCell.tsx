/* eslint-disable react/no-array-index-key */
import { BaseIcon } from '@ui/atoms';
import { IconType } from '@src/types/global';

import { IComponentTable } from '../../types';
import { TypoCellWrapper } from '../TypoCellWrapper';

export function IconCell({ header }: IComponentTable) {
  return header && header?.icon ? (
    <TypoCellWrapper head={header}>
      {Array.isArray(header.icon) ? (
        header.icon.map((icon: IconType, i: number) => (
          <BaseIcon key={i} icon={icon} color="teal" />
        ))
      ) : (
        <BaseIcon icon={header?.icon} color={header?.color} />
      )}
    </TypoCellWrapper>
  ) : null;
}
