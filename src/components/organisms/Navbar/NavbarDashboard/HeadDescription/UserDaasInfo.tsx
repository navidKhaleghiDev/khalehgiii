import { useCallback, useState } from 'react';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { useTranslation } from 'react-i18next';
import useSWR, { useSWRConfig } from 'swr';
import { BaseButton, Typography } from '@ui/atoms';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { IDaAs } from '@src/services/users/types';
import { Modal } from '@ui/molecules/Modal';
import { BaseTable } from '@ui/atoms/BaseTable';
import { API_USERS_LICENSE_UPDATE } from '@src/services/users';
import { licenseTrueStatusHeaderItem } from '@src/constants/tableHeaders/pamLicenseHeaderItem';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { useUserPermission } from '@src/helper/hooks/usePermission';

const PAGE_SIZE = 10;
const PAGE = 1;
export function UserDaasInfo() {
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const userPermissions = useUserPermission();

  const { data: list, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    `${E_USERS_DAAS}/?is_recording=True `,
    http.fetcherSWR
  );

  const onlineUsers = list?.data?.online_users || ' 0';
  const recordingSessions = list?.data?.online_recording_sessions || ' 0';
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

  const handleOnClickActions = (updatedData: any, id: string) => {
    updateLicense({ data: updatedData, id });
  };

  return (
    <>
      <Typography color="teal" className=" px-2 ">
        {`  ${t('global.onlineUsers')} : ${onlineUsers}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <BaseButton
        label={` ${t('global.usedPamLicense')} : ${recordingSessions} `}
        className="text-base"
        onClick={licenseButtonHandler}
        type="tealLink"
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        content={
          <div className="p-5">
            <BaseTable
              loading={isLoading || loading}
              headers={checkPermissionHeaderItem(
                userPermissions,
                licenseTrueStatusHeaderItem
              )}
              bodyList={licenseData as []}
              onClick={handleOnClickActions}
              pagination={paginationProps}
            />
          </div>
        }
        type="none"
      />
    </>
  );
}
