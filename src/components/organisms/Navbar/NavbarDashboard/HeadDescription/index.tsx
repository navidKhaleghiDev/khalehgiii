import { useCallback, useState } from 'react';
import { dateAndNumber, dayLabel } from '@src/helper/utils/dateUtils';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { IScanStats } from '@src/services/analyze/types';
import { HTTP_ANALYSES, http } from '@src/services/http';
import { IResponsePagination, ISwrResponse } from '@src/types/services';
import { useTranslation } from 'react-i18next';
import useSWR, { useSWRConfig } from 'swr';
import { BaseButton, Typography } from '@ui/atoms';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { IDaAs } from '@src/services/users/types';
import { Modal } from '@ui/molecules/Modal';
import { BaseTable } from '@ui/atoms/BaseTable';
import { API_USERS_LICENSE_UPDATE } from '@src/services/users';
import { licenseTrueStatusHeaderItem } from '@src/constants/tableHeaders/pamLicenseHeaderItem';

const PAGE_SIZE = 3;
const PAGE = 1;
export function HeadDescription() {
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(PAGE);

  const { data } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );

  const { data: list, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    `${E_USERS_DAAS}?is_recording=True `,
    http.fetcherSWR
  );
  const todayScans = data?.data?.info?.today_scans || '0';
  const remainingDays = data?.data?.info?.remaining_days || '--';
  const malwareFiles = data?.data?.info?.malware_files || '0';
  const onlineUsers = list?.data?.online_users || '0';
  const recordingSessions = list?.data?.online_recording_sessions || '0';
  const licenseData = list?.data.results;
  const countPage = list?.data?.count || 0;

  const updateLicense = useCallback(
    async (updatedData: any) => {
      setLoading(true);
      await API_USERS_LICENSE_UPDATE(updatedData)
        .then(() => {
          mutate(
            (key) => typeof key === 'string' && key.startsWith(E_USERS_DAAS),
            undefined,
            { revalidate: true }
          );
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    },
    [mutate]
  );

  const licenseButtonHandler = () => {
    setOpenModal(true);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  const handleOnClickActions = useCallback(
    (actions: any) => {
      updateLicense(actions);
    },
    [updateLicense]
  );

  return (
    <div className=" shadow-md rounded-lg h-7 px-2 flex justify-center items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 ">
      <Typography color="teal" className=" px-2 ">
        {`${dayLabel()}  ${dateAndNumber()}  `}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2  ">
        {` ${t('dashboard.numbersOfScans')} ${todayScans}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${malwareFiles}  ${t('dashboard.infectedFile')}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${remainingDays} ${t('dashboard.dayLeft')}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${onlineUsers} ${t('global.onlineUsers')}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <BaseButton
        label={` ${recordingSessions} ${t('global.usedPamLicense')}`}
        className="text-base"
        onClick={licenseButtonHandler}
        type="tealLink"
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        content={
          <BaseTable
            loading={isLoading || loading}
            headers={licenseTrueStatusHeaderItem}
            bodyList={licenseData as []}
            onClick={handleOnClickActions}
            pagination={paginationProps}
          />
        }
        type="none"
      />
    </div>
  );
}
