import { Typography } from '@redesignUi/atoms';

type UsedTimeProps = { time: number | string; isPermanent?: boolean };

export function AccessTime({ time, isPermanent }: UsedTimeProps) {
  const accessTime = time ? `${time}h` : '0h';
  const formattedTime = isPermanent ? '--' : accessTime;

  return (
    <Typography variant="body6" color="black">
      {formattedTime}
    </Typography>
  );
}
