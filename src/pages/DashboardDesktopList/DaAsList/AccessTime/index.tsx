import { Typography } from '@redesignUi/atoms';

type TUsedTimeProps = { time: number | string; isPermanent?: boolean };

export function AccessTime({ time, isPermanent }: TUsedTimeProps) {
  const accessTime = time ? `${time}h` : '0h';
  const formattedTime = isPermanent ? '--' : accessTime;

  return (
    <Typography variant="body6" color="black">
      {formattedTime}
    </Typography>
  );
}
