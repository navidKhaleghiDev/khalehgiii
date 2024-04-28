import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IScannedFile } from '@src/services/analyze/types';
import { useParams } from 'react-router-dom';
import { BaseTable } from '@ui/atoms/BaseTable';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { useTranslation } from 'react-i18next';
import { E_SESSION_RECORD_LIST_PAGINATION } from '@src/services/config/endpoint';
import { SessionRecordingHeaderItem } from '@src/constants/tableHeaders/SessionRecordingHeaderItem';
import { Modal } from '@ui/molecules/Modal';
import { debounce } from 'lodash';

const PAGE_SIZE = 8;
const PAGE = 1;

export function SessionRecordingList() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  // const [loading, setLoading] = useState();
  const [recoderdVideo, setRecordedVideo] = useState();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const { id } = useParams();
  const ids = id?.replace(':id', '');
  const { data, isLoading } = useSWR<IResponsePagination<IScannedFile>>(
    ids
      ? E_SESSION_RECORD_LIST_PAGINATION(ids, {
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

  // console.log(debouncedSetFilterQuery);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const sessionListHistory = data?.data?.history ?? [];
  const sessionListToday = data?.data?.today ?? [];
  const countPage = data?.data?.count ?? 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const getVideoUrl = async (video) => {
  //   setLoading(true);
  //   await API_GET_RECORDED_VIDEO(video)
  //     .then((res) => {
  //       const blob = new Blob([res.data]);
  //       const videoURL = URL.createObjectURL(blob);
  //       setRecordedVideo(videoURL);
  //       setOpenModal(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const getVideoUrl = () => {
    fetch(
      'http://192.168.2.23:8003/users/record_file/?record_name=eyvazi.mj@npdco.local_out_20240423_070522.mp4'
    )
      .then((response) => response.blob()) // Convert response to blob
      .then((blob) => {
        const videoBlob = new Blob([blob], { type: 'video/mp4' }); // Specify the correct MIME type
        const url = URL.createObjectURL(videoBlob); // Create a URL from the blob
        setRecordedVideo(url);
        setOpenModal(true);
      })
      .catch(() => {});
  };

  const handleOpenModal: OnClickActionsType<IScannedFile> = (action, item) => {
    if (action === 'more') {
      getVideoUrl(item.record_name);
    }
  };

  const paginationProps = {
    countPage,
    currentPage,
    handleSearchInput: handleFilterChange,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  const dataTableHistory = Object.entries(sessionListHistory).map((item) => {
    const key = item[0];
    const value = item[1];

    return { recrod_date: key, ...value[0] };
  });
  const transformedData = Object.entries(sessionListToday).flatMap(
    ([key, value]) => value.map((item) => ({ recrod_date: key, ...item }))
  );

  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <BaseTabs>
        <BaseTab label={t('global.wholeList')}>
          <BaseTable<IScannedFile>
            loading={isLoading}
            headers={SessionRecordingHeaderItem}
            bodyList={dataTableHistory}
            onClick={handleOpenModal}
            pagination={paginationProps}
          />
        </BaseTab>
        <BaseTab label={t('global.todayList')}>
          <BaseTable<IScannedFile>
            loading={isLoading}
            headers={SessionRecordingHeaderItem}
            bodyList={transformedData}
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
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video width="750" height="500" controls>
                <source src={recoderdVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {/* <video src={recoderdVideo} width="750" height="500" controls>
              <source kind="captions" src={recoderdVideo} type="video/mp4" />
            </video> */}
          </div>
        }
        type="none"
      />
    </div>
  );
}
