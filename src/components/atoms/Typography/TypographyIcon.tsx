/* eslint-disable react/jsx-props-no-spreading */
import { ITypographyIcon } from './types';
import { Typography } from './Typography';
import { BaseIcon } from '../BaseIcon';

export function TypographyIcon(props: ITypographyIcon) {
  const { startIcon, endIcon, text, iconColor, iconSize } = props;
  return (
    <div className="flex items-center justify-center">
      {startIcon && (
        <BaseIcon
          icon={startIcon}
          className="ml-2"
          color={iconColor}
          size={iconSize}
        />
      )}
      <Typography {...props}>{text}</Typography>
      {endIcon && (
        <BaseIcon
          icon={endIcon}
          className="mr-2"
          color={iconColor}
          size={iconSize}
        />
      )}
    </div>
  );
}
