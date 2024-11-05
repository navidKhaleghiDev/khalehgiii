import { Typography } from '@redesignUi/atoms';
import moment from 'moment-jalaali';

type ConvertedSecondsProps = { time: number | string };

export function ConvertedSecondsHelperCell({ time }: ConvertedSecondsProps) {
  const lang = localStorage.getItem('lang');
  const isFarsi = lang === 'fa';
  const totalSeconds = typeof time === 'string' ? parseInt(time, 10) : time;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const displayTime = moment()
    .startOf('day')
    .add(hours, 'hours')
    .add(minutes, 'minutes')
    .add(seconds, 'seconds');
  const formattedTime = displayTime.format(isFarsi ? 'HH:mm:ss' : 'HH:mm:ss');

  return (
    <Typography variant="body6" color="black">
      {formattedTime}
    </Typography>
  );
}
