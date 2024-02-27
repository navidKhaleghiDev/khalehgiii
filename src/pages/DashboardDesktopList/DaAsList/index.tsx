/* eslint-disable @typescript-eslint/no-use-before-define */
import { useCallback, useState } from 'react';
import { API_DAAS_DELETE, API_DAAS_UPDATE } from '@src/services/users';
import { IDaAs } from '@src/services/users/types';
import { Modal } from '@ui/molecules/Modal';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';

import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@ui/atoms/BaseTable';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { desktopListHeaderItem } from '@src/constants/tableHeaders/desktopListHeaderItem';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { SettingDaasModal } from './SettingDaasModal';
import { ActionOnClickActionsType } from './DaAsCard/types';

function compareExtensionLists(oldList?: string[], newList?: string[]) {
  const removedList: string[] = [];
  const addedList: string[] = [];
  if (!oldList || !newList) return { addedList, removedList };

  const setOne = new Set(oldList);
  const setTwo = new Set(newList);

  // Find strings added
  newList.forEach((item) => {
    if (!setOne.has(item)) {
      addedList.push(item);
    }
  });

  // Find strings missing
  oldList.forEach((item) => {
    if (!setTwo.has(item)) {
      removedList.push(item);
    }
  });

  return {
    addedList,
    removedList,
  };
}

const PAGE_SIZE = 8;
const PAGE = 1;

export function DaAsList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const [activeDaas, setActiveDaas] = useState<Partial<IDaAs>>();
  const [actionOnClick, setActionOnClick] =
    useState<ActionOnClickActionsType>();

  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);

  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });
  const { data, isLoading, mutate } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 2000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handleOnClickActions: OnClickActionsType<IDaAs> | undefined = (
    action,
    fileType
  ) => {
    if (action === 'mutate') {
      mutate();
      return;
    }

    if (action === 'edit') {
      setActiveDaas(fileType as IDaAs);
      setOpenSettingModal(true);
      return;
    }

    if (action === 'editLock') {
      setActiveDaas(fileType as IDaAs);
      setOpenModal(true);
      return;
    }

    if (fileType !== undefined && typeof fileType !== 'string') {
      setActionOnClick(action);
      setActiveDaas(fileType as IDaAs);
      setOpenModal(true);
    }
  };

  const handleOnRequests = async () => {
    if (!activeDaas) return;

    setLoadingButtonModal(true);
    if (actionOnClick === 'delete') {
      await API_DAAS_DELETE(activeDaas.id as string)
        .then(() => {
          mutate();
          toast.success(t('global.successfullyRemoved'));
          setOpenModal(false);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
    } else {
      updateDaas(activeDaas);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateDaas = async (daas?: Partial<IDaAs>, isLdp?: boolean) => {
    if (!daas) return;
    let daasUpdated = daas;
    if (isLdp) {
      const resultDownload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_download ?? [],
        daas?.allowed_files_type_for_download ?? []
      );

      const resultUpload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_upload ?? [],
        daas?.allowed_files_type_for_upload ?? []
      );

      const newExtraAllowedDownloadFiles = [
        ...(daas.extra_allowed_download_files || []),
        ...resultDownload.addedList,
      ];
      const newForbiddenDownloadFiles = [
        ...(daas.forbidden_download_files || []),
        ...resultDownload.removedList,
      ];

      const newExtraAllowedUploadFiles = [
        ...(daas.extra_allowed_upload_files || []),
        ...resultUpload.addedList,
      ];
      const newForbiddenUploadFiles = [
        ...(daas.forbidden_upload_files || []),
        ...resultUpload.removedList,
      ];

      daasUpdated = {
        ...daas,
        extra_allowed_download_files: [
          ...new Set(newExtraAllowedDownloadFiles),
        ],
        extra_allowed_upload_files: [...new Set(newExtraAllowedUploadFiles)],
        forbidden_download_files: [
          ...new Set(newForbiddenDownloadFiles),
        ].filter((value) => !resultDownload.addedList.includes(value)),
        forbidden_upload_files: [...new Set(newForbiddenUploadFiles)].filter(
          (value) => !resultUpload.addedList.includes(value)
        ),
      };
    }

    // get
    await API_DAAS_UPDATE(daasUpdated.id as string, daasUpdated)
      .then(() => {
        mutate();
        toast.success(t('global.sucessfulyUpdated'));
        if (openModal) setOpenModal(false);
        if (openSettingModal) setOpenSettingModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };
  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  const searchBarProps: TSearchBar = {
    name: 'search',
    value: filterQuery,
    handleSearchInput: handleFilterChange,
    componentProps: {
      type: 'actionRefresh',
    },
  };

  return (
    <div className={`w-full p-4 ${isLoading ? 'loading' : ''}`}>
      <BaseTable
        loading={isLoading}
        headers={desktopListHeaderItem}
        bodyList={listDaas}
        onClick={handleOnClickActions}
        pagination={paginationProps}
        searchBar={searchBarProps}
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: handleOnRequests,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setOpenModal(false),
          color: 'red',
        }}
      />
      <Modal
        open={openSettingModal}
        setOpen={setOpenSettingModal}
        type="success"
        content={
          <SettingDaasModal
            handleOnChange={(daas) => updateDaas(daas, true)}
            daas={activeDaas as IDaAs}
          />
        }
      />
    </div>
  );
}
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-key */
// import { memo } from 'react';
// import DatePicker, { DateObject } from 'react-multi-date-picker';

// import 'react-multi-date-picker/styles/colors/teal.css';
// import persian from 'react-date-object/calendars/persian';
// import gregorian from 'react-date-object/calendars/gregorian';

// import gregorian_en from 'react-date-object/locales/gregorian_en';
// import persian_fa from 'react-date-object/locales/persian_fa';
// import { Controller } from 'react-hook-form';
// import { Typography } from '@ui/atoms/Typography';

// import { useLanguage } from '@context/settings/languageContext';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';
// import { DatePickerProps } from '../types';
// import { baseInputStyles } from '../styles';

// export function convertI2ToAD(
//   i2Date?: DateObject | DateObject[] | undefined
// ): string | string[] | undefined {
//   if (!i2Date) return undefined;

//   const convertDate = (date: DateObject) =>
//     new DateObject({
//       date: date.toDate(),
//       calendar: gregorian,
//     }).format('YYYY-MM-DD hh:mm:ss');

//   return Array.isArray(i2Date) ? i2Date.map(convertDate) : convertDate(i2Date);
// }

// export const MultiDatePicker = memo(function MultiDatePicker({
//   control,
//   name,
//   id,
//   placeholder,
//   rules,
//   fullWidth = false,
//   defaultValue,
//   intent,
//   label,
//   hiddenError,
//   className,
//   maxDate,
//   minDate,
//   format = 'YYYY/MM/DD',
// }: DatePickerProps) {
//   const containerClass = `${fullWidth ? 'w-full' : 'w-36'} ${className || ''}`;
//   const inputClass = baseInputStyles({
//     intent,
//     className: `${fullWidth ? 'w-full' : 'w-36'} h-10 ${className || ''}`,
//     fullWidth,
//     size: 'none',
//   });
//   const { lang } = useLanguage();
//   const local = lang === 'fa' ? persian_fa : gregorian_en;
//   const calendar = lang === 'fa' ? persian : gregorian;

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       defaultValue={defaultValue}
//       render={({ field, fieldState: { error } }) => {
//         function setValue(undefined: undefined): void {
//           throw new Error('Function not implemented.');
//         }

//         return (
//           <div className={containerClass}>
//             {label && (
//               <label htmlFor={id} className="block mb-1">
//                 <Typography color="teal" size="h5">
//                   {label}
//                 </Typography>
//               </label>
//             )}
//             <DatePicker
//               onChange={field.onChange}
//               value={field.value}
//               format={format}
//               calendar={calendar}
//               range
//               locale={local}
//               placeholder={placeholder}
//               calendarPosition="bottom-right"
//               className="teal"
//               containerClassName={containerClass}
//               inputClass={inputClass}
//               minDate={minDate}
//               maxDate={maxDate}
//               plugins={[<DatePanel position="left" />]}
//             />
//             <button
//               style={{ margin: '5px', backgroundColor: 'red' }}
//               onClick={() => {
//                 field.onChange(undefined);
//               }}
//             >
//               لغو انتخاب
//             </button>
//             {!hiddenError && (
//               <Typography color="red" size="caption" className="h-6">
//                 {error?.message ?? ''}
//               </Typography>
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// });
