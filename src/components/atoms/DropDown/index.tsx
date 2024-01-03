import { useRef, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import caretCircleDownIcon from '@iconify-icons/ph/caret-circle-down';
import caretCircleLeftIcon from '@iconify-icons/ph/caret-circle-left';

import { DropdownProps, IOptionSelect, StateType } from './type';
import { optionSelectStyles, baseDropDownStyles } from './styles';
import { BaseIcon } from '../BaseIcon';
import { Typography } from '../Typography';
import { useTranslation } from 'react-i18next';

const initState = {
	activeOption: null,
	openOptions: false,
};

export function Dropdown<T extends FieldValues>({
	options,
	fullWidth,
	placeHolder,
	rules,
	control,
	name,
	defaultValue,
	className,
	label,
	size,
	hiddenError,
	containerClassName,
}: DropdownProps<T>) {
	const ref = useRef(null);
	const [state, setState] = useState<StateType>(initState);
	const { t } = useTranslation();
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
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<div className={`relative ${containerClassName} ${fullWidth && 'w-full'}`} ref={ref}>
					{label && (
						<label htmlFor={name} className="block mb-1">
							<Typography color="teal" size="h5">
								{label}
							</Typography>
						</label>
					)}
					<button
						type="button"
						onClick={toggleOpen}
						className={baseDropDownStyles({
							size,
							fullWidth,
							selected: !!value,
							intent: error ? 'error' : 'default',
							className,
						})}>
						{options.find((option) => option.id === value)?.label ?? placeHolder}
						<BaseIcon icon={state.openOptions ? caretCircleDownIcon : caretCircleLeftIcon} />
					</button>

					<div
						className={optionSelectStyles({
							isShow: state.openOptions,
							fullWidth,
						})}>
						{value && (
							<button
								type="button"
								className="w-full p-3 text-right text-gray-600 hover:bg-gray-200"
								onClick={() => {
									setState(initState);
									onChange(undefined);
								}}>
								{t('table.removeSelected')}
							</button>
						)}
						{options.map((option: IOptionSelect) => (
							<button
								type="button"
								key={option.id}
								className="w-full p-3 text-right text-teal-600 hover:bg-gray-200"
								onClick={() => {
									handleOnChange(option);
									onChange(option.id);
								}}>
								{option.label}
							</button>
						))}
					</div>
					{!hiddenError && (
						<Typography color="red" size="caption" className="h-6">
							{error?.message ?? ''}
						</Typography>
					)}
				</div>
			)}
		/>
	);
}
