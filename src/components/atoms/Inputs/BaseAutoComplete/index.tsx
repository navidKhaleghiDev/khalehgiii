/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form"
import { KeyboardEvent } from "react"

import { BaseInputProps } from "../types"
import { baseSelectStyles } from "./styles"
import { Typography } from "../../Typography"
import { useEffect, useRef, useState } from "react"

type OptionSelectedType = {
  [key: number]: string
}
const data: OptionSelectedType = {
  5: "Carl",
  6: "Alex",
  7: "Bryan",
  8: "three",
}
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
  } = props

  const [search, setSearch] = useState("")
  const [showSelector, setShowSelector] = useState(false)
  const [selected, setSelected] = useState<OptionSelectedType>({})
  const [options, setOptions] = useState<OptionSelectedType>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const clearOpts = () => {
    setSearch("")
    setShowSelector(false)
    setOptions([])
  }

  const select = (id: number, name: string) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [id]: name,
    }))
    clearOpts()
    // window.dispatchEvent(
    //   new CustomEvent("selected", { detail: Object.keys(selected) })
    // );
  }

  const remove = (id: number) => {
    setSelected((prevSelected) => {
      const updatedSelected = { ...prevSelected }
      delete updatedSelected[id]
      return updatedSelected
    })
    // window.dispatchEvent(
    //   new CustomEvent("selected", { detail: Object.keys(selected) })
    // );
  }
  const goSearch = () => {
    if (search) {
      const filteredValues = Object.values(data).filter((value) =>
        value.includes(search)
      )
      setOptions(filteredValues)
      setShowSelector(true)
    } else {
      setShowSelector(false)
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Perform your action here
      console.log("Enter key pressed")
    }
  }

  // const debouncedSearchValue = useDebounce(goSearch, 400)
  useEffect(() => {
    const timer = setTimeout(() => {
      goSearch()
    }, 400)

    return () => {
      clearTimeout(timer)
    }

    //  const debouncedSearch = debounce(goSearch, 400)
    //  debouncedSearch()
    //  return () => {
    //    debouncedSearch.cancel()
    // debouncedSearchValue()
  }, [search])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`${className} ${fullWidth && "w-full"} relative`}>
          {label && (
            <label
              htmlFor={id}
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {label}
            </label>
          )}
          <div
            className={`rounded-md flex justify-end gap-1 flex-wrap ${
              fullWidth ? "w-full" : "w-64"
            }`}
            onClick={() => inputRef.current?.focus()}
            // onClickOutside={() => setShowSelector(false)}
          >
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={inputRef}
              placeholder={placeholder}
              className={baseSelectStyles({
                intent: error?.message ? "error" : intent,
                className: `${endIcon && "pr-8"} ${startIcon && "pl-8"}`,
                fullWidth,
              })}
              onKeyDown={handleKeyPress}
            />
            {Object.entries(selected).map(([id, name]) => (
              <Chip
                key={id}
                onClick={() => remove(parseInt(id))}
                label={name}
              />
            ))}
            {showSelector && (
              <div className='absolute left-0 top-12 p-2 rounded-md border-2 border-teal-600 bg-white z-30 w-full rounded-b-md font-medium'>
                <div className='space-y-1'>
                  {Object.entries(options).map(([id, name]) => (
                    <div key={id}>
                      {!selected[parseInt(id)] && (
                        <div
                          className='bg-gray-200 cursor-pointer rounded-md p-2 hover:border-light-blue-1'
                          onClick={() => select(parseInt(id), name)}
                        >
                          {name}
                        </div>
                      )}
                    </div>
                  ))}
                  {Object.entries(options).length === 0 && (
                    <div className='text-gray-500'>No result</div>
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
              <OptionSelect option={{ label: "انتخاب کنید", value: "" }} />
              {[
                { id: "1", label: "گزینه", value: "tow" },
                { id: "2", label: "گزینه", value: "tow" },
              ].map((option: IOptionSelect) => (
                <OptionSelect key={option.id} option={option} />
              ))}
            </select>

             */}
          {!hiddenError && (
            <Typography color='red' size='caption' className='h-6'>
              {error?.message ?? ""}
            </Typography>
          )}
        </div>
      )}
    />
  )
}

const Chip = ({ label, onClick }: any) => (
  <div className='h-6 bg-gray-200 rounded-md flex items-center'>
    <div className='p-2'>{label}</div>
    <div
      className='p-2 select-none rounded-r-md cursor-pointer hover:bg-magma-orange-clear'
      onClick={onClick}
    >
      <svg
        width='8'
        height='8'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12.5745 1L1 12.5745'
          stroke='#FEAD69'
          strokeWidth='2'
          strokeLinecap='round'
        />
        <path
          d='M1.00024 1L12.5747 12.5745'
          stroke='#FEAD69'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    </div>
  </div>
)
