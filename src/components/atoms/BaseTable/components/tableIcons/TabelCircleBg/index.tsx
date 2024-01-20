import { CircleBg } from '@ui/atoms/CircleBg';

export function TableCircleBg({ defaultIconColor, color, condition }: any) {
  const bgColor =
    (condition && color && color[0]) ||
    (condition && !color && defaultIconColor[0]) ||
    (!condition && color && color[1]) ||
    (!condition && !color && defaultIconColor[1]);

  return <CircleBg bgColor={bgColor} />;
}
