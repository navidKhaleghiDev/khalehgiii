import { Typography, BaseIcon } from '@ui/atoms';
import {} from '@ui/atoms/BaseIcon';

export const IconCell = ({ row, id, head }: any) => {
	return (
		<Typography
			size={head.size ? head.size : 'body3'}
			type="div"
			className="text-xl whitespace-no-wrap break-all">
			{!Array.isArray(head.icon) ? (
				<head.icon bgColor={row[id] ? head?.color[0] : head?.color[1]} />
			) : (
				<BaseIcon icon={row[id] ? head.icon[0] : head.icon[1]} color={row[id] ? 'red' : 'teal'} />
			)}
		</Typography>
	);
};
