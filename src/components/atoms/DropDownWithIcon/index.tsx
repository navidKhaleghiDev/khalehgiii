import { useRef, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';

import { Typography } from '../Typography';

import { DropdownProps, IOptionSelect, StateType } from './type';
import { optionSelectStyles } from './styles';
import { IconButton } from '../BaseButton';

const initState = {
	activeOption: null,
	openOptions: false,
};

export function DropDownWithIcon<T extends FieldValues>({
	name,
	options,
	fullWidth,
	className,
	label,
	size,
	containerClassName,
	icon,
	onSelect,
}: DropdownProps<T>) {
	const ref = useRef(null);
	const [state, setState] = useState<StateType>(initState);

	const toggleOpen = () => setState((prev) => ({ ...prev, openOptions: !prev.openOptions }));

	useClickOutside({
		ref,
		setValue: () => {
			setState((prev) => ({ ...prev, openOptions: false }));
		},
		value: state.openOptions,
	});

	const handleOnChange = (option: IOptionSelect) => {
		setState({ activeOption: option, openOptions: false });
	};

	return (
		<div className={`relative ${containerClassName} ${fullWidth && 'w-full'}`} ref={ref}>
			{label && (
				<label htmlFor={name} className="block mb-1">
					<Typography color="teal" size="h5">
						{label}
					</Typography>
				</label>
			)}
			<IconButton
				icon={icon}
				onClick={toggleOpen}
				size="xl"
				className="ml-4 rounded-3xl"
				color="teal"
			/>
			<div className={optionSelectStyles({ isShow: state.openOptions, fullWidth, size })}>
				{options.map((option: IOptionSelect) => (
					<button
						type="button"
						key={option.id}
						className="w-full p-3 text-right text-teal-600 hover:bg-gray-200"
						onClick={() => {
							handleOnChange(option);
							onSelect(option.id);
						}}>
						{option.label}
					</button>
				))}
			</div>
		</div>
	);
}
