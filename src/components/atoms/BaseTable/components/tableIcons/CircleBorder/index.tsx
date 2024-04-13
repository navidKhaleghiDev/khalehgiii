import { Typography } from '@ui/atoms';
import { CircleBg } from '@ui/atoms/CircleBg';

type TCircleBorderProps = {
  id: string;
  results: boolean;
};

export function CircleBorder({ id, results }: TCircleBorderProps) {
  return (
    <span className="flex justify-between items-center border rounded-md px-3 gap-4 w-11/12 ">
      <CircleBg bgColor={results ? 'bg-red-600' : 'bg-green-400'} />
      <Typography size="body3">{id}</Typography>
    </span>
  );
}
