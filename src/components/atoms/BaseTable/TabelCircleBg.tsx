import { CircleBg } from '@ui/atoms/CircleBg';

export function TableCircleBg({ defaultIconColor, color, condition }) {
	return (
		<CircleBg
			bgColor={
				condition
					? color
						? color[0]
						: defaultIconColor[0]
					: color
					? color[1]
					: defaultIconColor[1]
			}
		/>
	);
}
