import { Typography } from '@ui/atoms/Typography';

export const FunctionCell = ({ row, id, head }: any) => (
	<Typography
		size={head?.size ? head?.size : 'body3'}
		type="div"
		className="whitespace-no-wrap break-all">
		{head?.function(row)}
	</Typography>
);
