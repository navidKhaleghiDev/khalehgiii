import { Typography } from '@ui/atoms/Typography';
import ToolTip from '@ui/atoms/Tooltip';

export const NoneCell = ({ row, id, head }: any) => {
	return (
		<ToolTip position="bottom" tooltip={row[id]} color="black" background="white">
			<Typography
				size={head?.size ? head?.size : 'body3'}
				type="div"
				className="break-all break-words truncate  bg-slate-800">
				{row[id]}
			</Typography>
		</ToolTip>
	);
};
