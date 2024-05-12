import { useCallback, useState } from 'react';
import { dateAndNumber, dayLabel } from '@src/helper/utils/dateUtils';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { IScanStats } from '@src/services/analyze/types';
import { HTTP_ANALYSES, http } from '@src/services/http';
import { IResponsePagination, ISwrResponse } from '@src/types/services';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { BaseButton, Typography } from '@ui/atoms';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_USERS_DAAS, E_USERS_LICENSE } from '@src/services/users/endpoint';
import { IDaAs } from '@src/services/users/types';
import { Modal } from '@ui/molecules/Modal';
import { BaseTable } from '@ui/atoms/BaseTable';
import { API_USERS_LICENSE_UPDATE } from '@src/services/users';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { LicenseStatusForm } from './LicenseStatusForm';

export function HeadDescription() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const [licenseData, setLiscenseData] = useState([]);

  const { data } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );
  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: 1,
    currentPage: 1,
  });
  const {
    data: list,
    isLoading,
    mutate,
  } = useSWR<IResponsePagination<IDaAs>>(endpoint, http.fetcherSWR);
  const todayScans = data?.data?.info?.today_scans || '0';
  const remainingDays = data?.data?.info?.remaining_days || '--';
  const malwareFiles = data?.data?.info?.malware_files || '0';
  const onlineUsers = list?.data?.online_users || '0';
  const recordingSessions = list?.data?.online_recording_sessions || '0';
  const licenseData = list?.data.results;

  console.log(licenseData);

  // const getLicense = async () => {
  //   setLoading(true);
  //   await API_USERS_LICENSE()
  //     .then((res) => {
  //       setLiscenseData(res.data.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const updateLicense = useCallback(async (updatedData: any) => {
    setLoading(true);
    await API_USERS_LICENSE_UPDATE(updatedData)
      .then((res) => {
        mutate();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const licenseButtonHandler = () => {
    setOpenModal(true);
  };

  const handleOnClickActions = useCallback((actions: any) => {
    updateLicense(actions);
  }, []);

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
        // title={t('global.changeNameAndPassword')}
        // content={<BaseTable />}
        content={
          <BaseTable
            loading={isLoading}
            headers={licenseTrueStatusHeaderItem}
            bodyList={licenseData}
            onClick={handleOnClickActions}
            // pagination={paginationProps}
          />
        }
        type="none"
      />
    </div>
  );
}
let licenseTrueStatusHeaderItem: IHeaderTable[] = [
  {
    label: 'table.nameOfTheUser',
    id: 'email',
    type: 'tooltip',
    class: 'px-3 w-6/12',
  },
  {
    label: 'table.realName',
    id: 'daas_configs.is_recording',
    type: 'component',
    component: (props: any) => (
      <LicenseStatusForm
        id={props.row.id as any}
        name={props.row.daas_configs.is_recording as any}
        onClick={props.onClick}
      />
    ),
    class: 'px-3 w-6/12',
  },
];
