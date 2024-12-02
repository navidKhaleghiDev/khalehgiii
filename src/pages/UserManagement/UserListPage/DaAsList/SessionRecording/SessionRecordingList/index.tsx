import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { toast } from 'react-toastify';

import Play from '@iconify-icons/ph/play';
import { http } from '@src/services/http';
import { ISessionResponsePagination } from '@src/types/services';
import { E_SESSION_RECORD_LIST_PAGINATION } from '@src/services/config/endpoint';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { API_GET_RECORDED_VIDEO } from '@src/services/users';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { BaseTab, BaseTabs } from '@redesignUi/atoms/BaseTabs/BaseTabs';
import { Modal } from '@redesignUi/molecules/Modal';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';

import { ISessionRecordList, TRecordData } from '../types';
import { SessionRecordingHeaderItem } from './constants/SessionRecordingHeaderItem';

const PAGE_SIZE = 5;
const PAGE = 1;
const tableClass =
  '[&_thead]:bg-gray-100 [&_tbody_tr_td_*]:text-gray-500 dark:[&_tbody_tr_td_*]:text-gray-400 [&_thead_tr_*]:text-gray-500 dark:[&_thead_tr_*]:text-gray-400 [&_tbody_tr_td:nth-child(3)]:hidden md:[&_thead_tr:nth-child(3)]:table-cell [&_thead_tr:nth-child(4)]:hidden md:[&_thead_tr:nth-child(4)]:table-cell [&_thead_tr:nth-child(3)]:hidden md:[&_tbody_tr_td:nth-child(3)]:table-cell [&_tbody_tr_td:nth-child(4)]:hidden md:[&_tbody_tr_td:nth-child(4)]:table-cell';

interface SessionRecordingListProps {
  id: string | null;
  username: string;
}

export function SessionRecordingList({
  id,
  username,
}: SessionRecordingListProps) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [recordVideo, setRecordedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(PAGE);

  const userPermissions = useUserPermission();

  const { data, isLoading } = useSWR<
    ISessionResponsePagination<ISessionRecordList>
  >(
    id
      ? E_SESSION_RECORD_LIST_PAGINATION(id, {
          page: currentPage,
          pageSize: 9,
        })
      : null,
    http.fetcherSWR
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sessionListHistory = data?.data?.history ?? [];
  const sessionListToday = data?.data?.today ?? [];
  const countPage = data?.data?.count ?? 0;

  const dataTableHistory = Object.entries(sessionListHistory).map((item) => {
    const key = item[0];
    const value = item[1] as any;

    return { recrod_date: key, ...value[0] };
  });
  const dataTableToday = Object.entries(sessionListToday).flatMap(
    ([key, value]) =>
      value.map((item: TRecordData) => ({ recrod_date: key, ...item }))
  );

  const getVideoUrl = async (video: string) => {
    await API_GET_RECORDED_VIDEO(video)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        setRecordedVideo(videoURL);
        setOpenModal(true);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleOpenModal: OnClickActionsType<TRecordData> = (action, item) => {
    if (action === 'more' && item) {
      getVideoUrl(item.record_name);
    }
  };

  const paginationProps = {
    countPage,
    currentPage,
    allItems: 3,
    itemsPer: PAGE_SIZE,
    paginationLabel: t('header.user'),
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        {/* <MultiDatePickerController
          id="date-filter"
          name="date-filter"
          control={control}
          className="!self-end"
          size="md"
          format="YYYYMMDD" 
        /> */}
        {/* این قسمت باید اضافه شود */}
      </div>
      <BaseTabs>
        <BaseTab label={t('global.wholeList')}>
          <div className={tableClass}>
            <BaseTable
              pagination={paginationProps}
              loading={isLoading}
              header={checkPermissionHeaderItem(
                userPermissions,
                SessionRecordingHeaderItem
              )}
              body={dataTableHistory}
              onClick={handleOpenModal}
            />
          </div>
        </BaseTab>
        <BaseTab label={t('global.todayList')}>
          <div className={tableClass}>
            <BaseTable
              pagination={paginationProps}
              loading={isLoading}
              header={checkPermissionHeaderItem(
                userPermissions,
                SessionRecordingHeaderItem
              )}
              body={dataTableToday}
              onClick={handleOpenModal}
            />
          </div>
        </BaseTab>
      </BaseTabs>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        icon={Play}
        title={t('userList.recordedActivities')}
        descriptionInfo={`${t('userList.recordedUserActivities')} ${username}`}
        content={
          <div>
            {recordVideo ? (
              <video width="750" height="500" controls>
                <track kind="captions" />
                <source src={recordVideo} type="video/mp4" />
                {t('userList.yourBrowserDoesntSupportVideo')}
              </video>
            ) : null}
          </div>
        }
        type="content"
      />
    </div>
  );
}
