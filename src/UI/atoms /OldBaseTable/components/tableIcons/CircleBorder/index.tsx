import { CircleBg } from '@ui/atoms/CircleBg';
import { Typography } from '@ui/atoms/Typography';

type CircleBorderProps = {
  id: string;
  results: boolean;
};

export function CircleBorder({ id, results }: CircleBorderProps) {
  return (
    <span className="flex justify-between items-center border rounded-md px-3 gap-4 w-11/12 ">
      <CircleBg bgColor={results ? 'bg-red-600' : 'bg-green-400'} />
      <Typography variant="body3">{id}</Typography>
    </span>
  );
}
