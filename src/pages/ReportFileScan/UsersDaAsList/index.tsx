// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import useSWR from 'swr';

// import { IDaAs } from '@src/services/users/types';
// import { http } from '@src/services/http';
// import { IResponsePagination } from '@src/types/services';
// import { E_USERS_DAAS } from '@src/services/users/endpoint';
// import { createAPIEndpoint } from '@src/helper/utils';
// import { Modal } from '@redesignUi/molecules/Modal';
// import { BaseTable } from '@ui/atoms/BaseTable';
// import PhPlayDuotone from '@iconify-icons/ph/play-duotone';
// import { BaseIcon, Typography } from '@redesignUi/atoms';
// import { MultiDatePicker } from '@redesignUi/atoms/Inputs/DatePicker';
// import { ScannedFileList } from '@src/pages/ScannedFileListPage/ScannedFileList';
// import { useUserPermission } from '@src/helper/hooks/usePermission';
// import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
// import { monitoringHeaderItem } from '@src/pages/ReportFileScan/constants/constants';

// import FilterReports from '../FilterReports';

// const PAGE_SIZE = 8;
// const PAGE = 1;

// export function UsersDaAsList() {
//   const [currentPage, setCurrentPage] = useState<number>(PAGE);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [modelId, setModelId] = useState('');
//   const { t } = useTranslation();
//   const [open, setOpen] = useState(false);
//   const [filterList, setFilterList] = useState<string | number>();
//   const userPermissions = useUserPermission();

//   const userHandler = (list: any) => {
//     setOpen(true);
//     setModelId(list.email);
//   };

//   const endpoint = createAPIEndpoint({
//     endPoint: E_USERS_DAAS,
//     pageSize: PAGE_SIZE,
//     currentPage,
//     filterQuery: searchQuery,
//   });

//   const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
//     endpoint,
//     http.fetcherSWR
//   );

//   const handelSearchValue = (searchValue: string) => {
//     setCurrentPage(PAGE);
//     setSearchQuery(searchValue);
//   };

//   // Remember to thing about this part
//   const handelFilterQuery = (filter: any) => {
//     setFilterList(filter?.value);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const paginationProps = {
//     countPage,
//     currentPage,
//     totalPages: Math.ceil(countPage / PAGE_SIZE),
//     onPageChange: handlePageChange,
//   };

//   return (
//     <>
//       <FilterReports
//         searchQuery={searchQuery}
//         handelSearchQuery={handelSearchValue}
//         handelFilterList={handelFilterQuery}
//       />
//       <div className={`w-full p-4 ${isLoading ? 'loading' : ''}`}>
//         <BaseTable
//           loading={isLoading}
//           bodyList={filterListDass}
//           headers={checkPermissionHeaderItem(
//             userPermissions,
//             monitoringHeaderItem
//           )}
//           onClick={userHandler}
//           pagination={paginationProps}
//         />
//         <Modal
//           open={open}
//           setOpen={setOpen}
//           type="content"
//           className="dark:bg-gray-700"
//           content={
//             <div className=" w-[20.875rem] sm:w-[39.68rem]">
//               <div className="flex items-center gap-5">
//                 <BaseIcon icon={PhPlayDuotone} size="lg" color="neutral" />
//                 <div className="text-right">
//                   <Typography variant="body3B" color="neutralDark">
//                     {t('fileScan.recordedActivities')}
//                   </Typography>
//                   <Typography variant="body6" color="neutralLight">
//                     {t('fileScan.userRecordedActivities')}
//                   </Typography>
//                 </div>
//               </div>
//               <MultiDatePicker
//                 id="daasDatePicker"
//                 name="daasDatePicker"
//                 className="text-right mt-9 mb-5"
//                 onChange={() => console.log('datePicker change')}
//               />
//               <ScannedFileList id={modelId} />
//             </div>
//           }
//         />
//       </div>
//     </>
//   );
// }
