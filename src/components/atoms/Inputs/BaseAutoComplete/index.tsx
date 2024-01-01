/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';
import { KeyboardEvent } from 'react';

import { BaseInputProps } from '../types';
import { baseSelectStyles } from './styles';
import { Typography } from '../../Typography';
import { useEffect, useRef, useState } from 'react';
import { BaseChip } from '@ui/atoms/BaseChip';

// type OptionSelectedType = {
//   [key: number]: string;
// };

type OptionSelectedType = string[];
const data: OptionSelectedType = ['Carl', 'Alex', 'Bryan', 'three'];
export function BaseAutoComplete(props: BaseInputProps<any>) {
	const {
		control,
		name,
		id,
		placeholder,
		rules,
		className,
		fullWidth,
		defaultValue,
		startIcon,
		endIcon,
		intent,
		hiddenError,
		label,
	} = props;

	const [search, setSearch] = useState('');
	const [showSelector, setShowSelector] = useState(false);
	const [selected, setSelected] = useState<OptionSelectedType>([]);
	const [options, setOptions] = useState<OptionSelectedType>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const clearOpts = () => {
		setSearch('');
		setShowSelector(false);
		setOptions([]);
	};

	const select = (value: string) => {
		setSelected((prevSelected) => [...prevSelected, value]);
		clearOpts();
		// window.dispatchEvent(
		//   new CustomEvent("selected", { detail: Object.keys(selected) })
		// );
	};

	const remove = (value: string) => {
		let newArray = selected.filter((item) => item !== value);
		setSelected(newArray);
		// window.dispatchEvent(
		//   new CustomEvent("selected", { detail: Object.keys(selected) })
		// );
	};

	const goSearch = () => {
		if (search) {
			const filteredValues = Object.values(data).filter((value) => value.includes(search));
			setOptions(filteredValues);
			setShowSelector(true);
		} else {
			setShowSelector(false);
		}
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			// Perform your action here
			event.preventDefault();
			// const value = event.target?.value
			// setOptions((pre)=>{});

			// console.log("Enter key pressed", event.target?.value);
		}
	};

	// const debouncedSearchValue = useDebounce(goSearch, 400)
	useEffect(() => {
		const timer = setTimeout(() => {
			goSearch();
		}, 400);

		return () => {
			clearTimeout(timer);
		};

		//  const debouncedSearch = debounce(goSearch, 400)
		//  debouncedSearch()
		//  return () => {
		//    debouncedSearch.cancel()
		// debouncedSearchValue()
	}, [search]);

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={({ fieldState: { error } }) => {
				console.log({ selected });

				return (
					<div className={`${className} ${fullWidth && 'w-full'} relative`}>
						{label && (
							<label
								htmlFor={id}
								className="block mb-2 text-md font-medium text-gray-900 dark:text-white text-left">
								{label}
							</label>
						)}
						<div
							className={`rounded-md flex justify-end gap-1 flex-wrap ${
								fullWidth ? 'w-full' : 'w-64'
							}`}
							onClick={() => inputRef.current?.focus()}
							// onClickOutside={() => setShowSelector(false)}
						>
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								ref={inputRef}
								placeholder={placeholder}
								className={baseSelectStyles({
									intent: error?.message ? 'error' : intent,
									className: `${endIcon && 'pr-8'} ${startIcon && 'pl-8'}`,
									fullWidth,
								})}
								onKeyDown={handleKeyPress}
							/>
							{selected.map((value, index) => (
								<BaseChip key={index} onClick={() => remove(value)} label={value} />
							))}
							{showSelector && (
								<div className="absolute left-0 top-20 p-2 rounded-md border-2 border-teal-600 bg-white z-50 w-full rounded-b-md font-medium">
									<div className="space-y-1 bg-green-200">
										{options.map((value, index) => {
											const indexOf = selected.indexOf(value);

											return (
												<div key={index}>
													{!selected[indexOf] && (
														<div
															className="bg-gray-200 cursor-pointer rounded-md p-2 hover:border-light-blue-1"
															onClick={() => select(value)}>
															{name}
														</div>
													)}
												</div>
											);
										})}
										{Object.entries(options).length === 0 && (
											<div className="text-gray-500 bg-red-200">No result</div>
										)}
									</div>
								</div>
							)}
						</div>
						{/* 
              <select
                id={id}
                dir='auto'
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                className={baseSelectStyles({
                  intent: error?.message ? "error" : intent,
                  className: `${endIcon && "pr-8"} ${startIcon && "pl-8"}`,
                  fullWidth,
                })}
                placeholder={placeholder}
              >
                <OptionSelect option={{ label: t("global.select"), value: "" }} />
                {[
                  { id: "1", label: "گزینه", value: "tow" },
                  { id: "2", label: "گزینه", value: "tow" },
                ].map((option: IOptionSelect) => (
                  <OptionSelect key={option.id} option={option} />
                ))}
              </select>
  
               */}
						{!hiddenError && (
							<Typography color="red" size="caption" className="h-6">
								{error?.message ?? ''}
							</Typography>
						)}
					</div>
				);
			}}
		/>
	);
}
