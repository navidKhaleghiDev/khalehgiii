import { Typography } from '@redesignUi/atoms';

type TUsedTimeProps = { time: number | string; isPermanent?: boolean };

export function AccessTime({ time, isPermanent }: TUsedTimeProps) {
  const formattedTime = isPermanent ? '--' : time ? `${time}h` : '0h';

  return (
    <Typography variant="body6" color="black">
      {formattedTime}
    </Typography>
  );
}
