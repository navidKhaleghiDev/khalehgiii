import { CircleBg } from '@ui/atoms/CircleBg';

type TTableCircleBg = {
  defaultIconColor: string | [];
  color: string | [];
  condition: boolean;
};

export function TableCircleBg({
  defaultIconColor,
  color,
  condition,
}: TTableCircleBg) {
  const bgColor =
    (condition && color && color[0]) ||
    (condition && !color && defaultIconColor[0]) ||
    (!condition && color && color[1]) ||
    (!condition && !color && defaultIconColor[1]);

  return <CircleBg bgColor={bgColor as string} />;
}
