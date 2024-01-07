import { Card, Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

interface HeaderItem {
	style: string;
	dir: string;
	label: string;
}

interface BaseTableHeaderProps {
	header: HeaderItem[];
}

export function BaseTabelHeader({ header }: BaseTableHeaderProps) {
	const { t } = useTranslation();

	return (
		<Card
			color="neutral"
			className="flex items-center px-2 my-2 w-full bg-teal-500 text-white h-10">
			{header.map((head: HeaderItem, i: number) => (
				<div
					key={i}
					className={`${head.style} flex justify-center items-center font-normal`}
					dir={!head.dir ? 'ltr' : head.dir}>
					<Typography size="body4" type="div" className="uppercase ellipsis">
						{t(head.label)}
					</Typography>
				</div>
			))}
		</Card>
	);
}
