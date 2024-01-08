import { Typography } from '@ui/atoms';
import { CircleBg } from '@ui/atoms/CircleBg';

export function CircleBGBorder({ row, id, results, head }: any) {
	return (
		<>
			<span className="flex justify-between items-center border rounded-md px-3 gap-4 w-11/12 ">
				<CircleBg bgColor={results ? 'bg-red-600' : 'bg-green-400'} />
				<Typography size="body3">{row[id]}</Typography>
			</span>
		</>
	);
}
