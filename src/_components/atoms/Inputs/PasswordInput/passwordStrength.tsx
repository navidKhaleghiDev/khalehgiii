import { Typography } from '@ui/atoms/Typography';
import CircleFill from '@iconify-icons/ph/circle-fill';

import {
  getPasswordStrength,
  getLabelPasswordStrength,
  EPasswordStrengthColor,
} from '@src/helper/utils/getPasswordStrength';
import { useEffect, useState } from 'react';
import { BaseIcon } from '@ui/atoms/BaseIcon';

export function PasswordStrength({ password }: { password?: string }) {
  const [colorStrength, setColorStrength] =
    useState<EPasswordStrengthColor | null>(null);

  useEffect(() => {
    setColorStrength(getPasswordStrength(password));
  }, [password]);

  const getColorClass = (strength: EPasswordStrengthColor | null) => {
    if (strength === null) return 'w-1/5 bg-red-400';
    if (strength === 'red') return 'w-1/3 bg-red-400';
    if (strength === 'yellow') return 'w-2/3 bg-yellow-200';
    return 'w-full bg-teal-500';
  };

  return (
    <>
      <div className="flex items-center mb-5">
        <div className="w-16 h-1 rounded bg-gray-200">
          <div className={`rounded h-1 ${getColorClass(colorStrength)}`} />
        </div>

        {colorStrength && (
          <Typography className="mx-2" color="neutralLight" variant="body6">
            {getLabelPasswordStrength(colorStrength)}
          </Typography>
        )}
      </div>

      <div>
        <div className="flex flex-nowrap items-center">
          <BaseIcon
            icon={CircleFill}
            className="w-1.5 h-1.5 text-gray-400 ml-1.5"
          />
          <Typography variant="body6" color="neutralLight">
            باید شامل 8 کارکتر و یا بیشتر باشد.
          </Typography>
        </div>
        <div className="flex flex-nowrap items-center">
          <BaseIcon
            icon={CircleFill}
            className="w-1.5 h-1.5 text-gray-400 ml-1.5"
          />
          <Typography variant="body6" color="neutralLight">
            حروف کوچک و حروف بزرگ داشته باشد.
          </Typography>
        </div>
        <div className="flex flex-nowrap items-center">
          <BaseIcon
            icon={CircleFill}
            className="w-1.5 h-1.5 text-gray-400 ml-1.5"
          />
          <Typography variant="body6" color="neutralLight">
            شامل یک یا چند نماد خاص باشد.
          </Typography>
        </div>
      </div>
    </>
  );
}
