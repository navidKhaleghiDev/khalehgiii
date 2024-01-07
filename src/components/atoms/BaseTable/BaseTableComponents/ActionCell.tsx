import { IconButton } from '@ui/atoms/BaseButton';

export const ActionCell = ({ row, id, head, onClick }: any) => {
	return (
		<>
			{head?.action.map((action, index) => (
				<IconButton key={index} {...action} onClick={() => onClick(action.action, row)} />
			))}
		</>
	);
};
