import { Typography } from '@ui/atoms';
import { CircleBg } from '@ui/atoms/CircleBg';

export function CircleBGBorder({ icon, title }) {
	console.log(icon, title);
	return (
		<>
			<span className="flex justify-between items-center border rounded-md px-3 gap-4">
				<CircleBg bgColor={icon} />
				<Typography size="body3">{title}</Typography>
			</span>
		</>
	);
}
