import { Typography } from '@ui/atoms/Typography';

import {
  getPasswordStrength,
  getLabelPasswordStrength,
  EPasswordStrengthColor,
} from '@src/helper/utils/getPasswordStrength';
import { useEffect, useState } from 'react';

export function PasswordStrength({ password }: { password?: string }) {
  const [colorStrength, setColorStrength] =
    useState<EPasswordStrengthColor | null>(null);

  useEffect(() => {
    setColorStrength(getPasswordStrength(password));
  }, [password]);
  // const colorStrength = getPasswordStrength(password) as EPasswordStrengthColor;

  return (
    <div className="flex justify-center items-center w-full ">
      {colorStrength && (
        <Typography className="mx-2" color={colorStrength}>
          {getLabelPasswordStrength(colorStrength)}
        </Typography>
      )}
      <div
        className={`border border-red-400 h-1 w-full ${
          colorStrength === 'teal'
            ? `bg-${colorStrength}-500`
            : `bg-neutral-200`
        } rounded mx-1`}
      />
      <div
        className={`border border-blue-400 h-1 w-full ${
          colorStrength === 'yellow' || colorStrength === 'teal'
            ? `bg-${colorStrength}-500`
            : `bg-neutral-200`
        } rounded mx-1`}
      />
      <div
        className={`border border-black h-1 w-full ${
          colorStrength ? `bg-${colorStrength}-500` : `bg-neutral-200`
        } rounded mx-1`}
      />
    </div>
  );
}
