import React from 'react';
import { Card } from '@ui/atoms';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { BaseTabelHeader } from './BaseTabelHeader';
import { useTranslation } from 'react-i18next';
import { NoneCell } from './BaseTableComponents/NoneCell';
import { FunctionCell } from './BaseTableComponents/FunctionCell';
import { IconCell } from './BaseTableComponents/IconCell';
import { ActionCell } from './BaseTableComponents/ActionCell';
import { ComponentCell } from './BaseTableComponents/ComponentCell';

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
	function: any;
	icon: any;
}

const StatusComponent = ({ row }: any) => <div>{'dkhfkdshkjfsdhk'}</div>;

function cellsComponent(row: any, head: keyof ComponentsProps, onClick: any) {
	const id = head?.id;
	const convertedData = { row, id, head, onClick };

	const components: ComponentsProps = {
		none: <NoneCell {...convertedData} />,
		component: <ComponentCell {...convertedData} />,
		status: <StatusComponent {...convertedData} />,
		function: <FunctionCell {...convertedData} />,
		icon: <IconCell {...convertedData} />,
		action: <ActionCell {...convertedData} />,
	};

	return components[head.type] || null;
}

const RowCard = ({ item, header, onClick }: any) => {
	return (
		<Card color="neutral" className={`flex items-center px-2 my-2 w-full text-neutral-600 h-14   `}>
			{header.map((head: any, i: string) => (
				<div
					key={i}
					className={`${head.style} flex justify-center items-center `}
					dir={!head.dir ? 'ltr' : head.dir}>
					{cellsComponent(item, head, onClick)}
				</div>
			))}
		</Card>
	);
};

export const BaseTable: React.FC<BaseTableProps> = (props) => {
	const { header, body, loading, onClick } = props;
	const { t } = useTranslation();

	return (
		<>
			<BaseTabelHeader header={header} />
			{loading ? (
				<LoadingSpinner />
			) : body.length > 0 ? (
				body.map((item, index) => (
					<RowCard key={index} item={item} header={header} onClick={onClick} />
				))
			) : (
				<NoResult />
			)}
		</>
	);
};
