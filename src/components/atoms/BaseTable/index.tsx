import React from 'react';
import { Card, Typography } from '@ui/atoms';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { BaseTabelHeader } from './BaseTabelHeader';
import { useTranslation } from 'react-i18next';

interface HeaderItem {
	style: string;
	dir: string;
	label: string;
	type: string;
}

interface BodyItem {
	item: { [key: string]: any };
	index: number;
}

interface BaseTableProps {
	header: HeaderItem[];
	body: BodyItem[];
	loading: boolean;
	onClick: () => void;
}
interface ComponentsProps {
	none: JSX.Element;
	component: JSX.Element;
	status: JSX.Element;
}

const NoneCell = ({ data, id }: any) => (
	<Typography size="body3" type="div" className="text-xl whitespace-no-wrap break-all">
		{data[id]}
	</Typography>
);
const YourComponent = ({ data }: any) => <div>{'flkhsdkhfksdkfkh'}</div>;

const StatusComponent = ({ data }: any) => <div>{'dkhfkdshkjfsdhk'}</div>;

function cellsComponent(row: any, head: keyof ComponentsProps) {
	const components: ComponentsProps = {
		none: <NoneCell data={row} id={head.id} />,
		component: <YourComponent data={row} id={head.id} />,
		status: <StatusComponent data={row} id={head.id} />,
		function: (props) => console.log(props),
	};

	return components[head.type] || null;
}

const RowCard = ({ item, header }: any) => {
	return (
		<Card color="neutral" className={`flex items-center px-2 my-2 w-full text-neutral-600 h-14`}>
			{header.map((head: any, i: string) => (
				<div
					key={i}
					className={`${head.style} flex justify-center items-center`}
					dir={!head.dir ? 'ltr' : head.dir}>
					{cellsComponent(item, head)}
				</div>
			))}
		</Card>
	);
};

export const BaseTable: React.FC<BaseTableProps> = (props) => {
	const { header, body, loading } = props;
	const { t } = useTranslation();

	return (
		<>
			<BaseTabelHeader header={header} />
			{loading ? (
				<LoadingSpinner />
			) : body.length > 0 ? (
				body.map((item, index) => <RowCard key={index} item={item} header={header} />)
			) : (
				<NoResult />
			)}
		</>
	);
};
