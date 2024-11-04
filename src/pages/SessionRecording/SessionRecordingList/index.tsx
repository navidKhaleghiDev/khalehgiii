import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { ISessionResponsePagination } from '@src/types/services';
import { useParams } from 'react-router-dom';
import { BaseTable } from '@ui/atoms/BaseTable';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { BaseTab, BaseTabs } from '@redesignUi/atoms/BaseTabs';
import { useTranslation } from 'react-i18next';
import { E_SESSION_RECORD_LIST_PAGINATION } from '@src/services/config/endpoint';
import { Modal } from '@ui/molecules/Modal';
import { debounce } from 'lodash';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';

import { API_GET_RECORDED_VIDEO } from '@src/services/users';
import { ISessionRecordList, TRecordData } from '../types';
import { SessionRecordingHeaderItem } from './constants/SessionRecordingHeaderItem';

const PAGE_SIZE = 8;
const PAGE = 1;

export function SessionRecordingList() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [recoderdVideo, setRecordedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const { id } = useParams();

  const userPermissions = useUserPermission();

  const { data, isLoading } = useSWR<
    ISessionResponsePagination<ISessionRecordList>
  >(
    id
      ? E_SESSION_RECORD_LIST_PAGINATION(id, {
          page: currentPage,
          pageSize: PAGE_SIZE,
          filter: `search=${encodeURIComponent(filterQuery)}`,
        })
      : null,
    http.fetcherSWR
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 1000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sessionListHistory = data?.data?.history ?? [];
  const sessionListToday = data?.data?.today ?? [];
  const countPage = data?.data?.count ?? 0;

  const getVideoUrl = async (video: string) => {
    setLoading(true);
    await API_GET_RECORDED_VIDEO(video)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        setRecordedVideo(videoURL);
        setOpenModal(true);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOpenModal: OnClickActionsType<TRecordData> = (action, item) => {
    if (action === 'more' && item) {
      getVideoUrl(item.record_name);
    }
  };

  const dataTableHistory = Object.entries(sessionListHistory).map((item) => {
    const key = item[0];
    const value = item[1] as any;

    return { recrod_date: key, ...value[0] };
  });
  const dataTableToday = Object.entries(sessionListToday).flatMap(
    ([key, value]) =>
      value.map((item: TRecordData) => ({ recrod_date: key, ...item }))
  );

  const paginationProps = {
    countPage,
    currentPage,
    handleSearchInput: handleFilterChange,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  return (
    <div className={`w-full p-4  ${isLoading || loading ? 'loading' : ''}`}>
      <BaseTabs>
        <BaseTab label={t('global.wholeList')}>
          <BaseTable
            loading={isLoading}
            headers={checkPermissionHeaderItem(
              userPermissions,
              SessionRecordingHeaderItem
            )}
            bodyList={dataTableHistory}
            onClick={handleOpenModal}
            pagination={paginationProps}
          />
        </BaseTab>
        <BaseTab label={t('global.todayList')}>
          <BaseTable
            loading={isLoading}
            headers={checkPermissionHeaderItem(
              userPermissions,
              SessionRecordingHeaderItem
            )}
            bodyList={dataTableToday}
            onClick={handleOpenModal}
          />
        </BaseTab>
      </BaseTabs>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        content={
          <div>
            {recoderdVideo && (
              <video width="750" height="500" controls>
                <track kind="captions" />
                <source src={recoderdVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        }
        type="none"
      />
    </div>
  );
}
