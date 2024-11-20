import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import PhPlayDuotone from '@iconify-icons/ph/play-duotone';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import { Modal } from '@redesignUi/molecules/Modal';
import { NoResult } from '@redesignUi/molecules/NoResult';
import { http } from '@src/services/http';
import { E_USERS_ONLINE_ASSISTANCE_GROUP } from '@src/services/users/endpoint';
import { OnlineAssistanceModel } from '@src/services/users/types';
import { usePaginationSwr } from '@src/services/http/httpClient';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { API_KNOWLEDGE_MANAGEMENT } from '@src/services/users';
import { IOptionSelect } from '@redesignUi/atoms/BaseDropdownIcon/type';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { VideoLoadingSkelton } from '../Components/VideoLoadingSkelton';
import { KnowledgeManagementHeaderItem } from '../constants';

const PAGE_SIZE = 8;
const PAGE = 1;

export function KnowledgeManagementList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [group, setFilterGroup] = useState<IOptionSelect>();
  const [openModal, setOpenModal] = useState(false);
  const [videoFile, setVideoFile] = useState<{
    loading?: boolean;
    file?: string;
  } | null>(null);

  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  const { count, resultData, isLoading, error } =
    usePaginationSwr<OnlineAssistanceModel>(
      E_USERS_ONLINE_ASSISTANCE_GROUP({
        page: currentPage,
        pageSize: PAGE_SIZE,
        filter: filterQuery,
        group: group?.value,
      }),
      http.fetcherSWR
    );

  const handleOnClickRow: OnClickActionsType<OnlineAssistanceModel> = async (
    _,
    row
  ) => {
    setVideoFile({ loading: true });
    setOpenModal(true);
    await API_KNOWLEDGE_MANAGEMENT(row?.id as string)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        setVideoFile({ loading: false, file: videoURL });
      })
      .catch((err) => {
        setOpenModal(false);
        toast.error(
          err.message ?? 'error on get video of knowledge management'
        );
      });
  };
  const handelSearchQuery = useCallback((value: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(value);
  }, []);

  const paginationProps = {
    countPage: count,
    currentPage,
    totalPages: Math.ceil(count / PAGE_SIZE),
    paginationLabel: t('header.admin'),
    allItems: count,
    itemsPer: resultData.length,
    onPageChange: (page: number) => setCurrentPage(page),
  };

  const flattedListDaas = resultData?.map((item) => ({
    ...item,
    admin_email: item.admin.email,
    user_email: item.user.email,
  }));

  return (
    <>
      <FilterTableList
        handelSearchQuery={handelSearchQuery}
        searchQuery={filterQuery}
        handelGroupeFilter={(value) => setFilterGroup(value as IOptionSelect)}
        searchPlaceholder={t('fileScan.adminSearch')}
      />
      <div className="mt-5">
        {!error ? (
          <BaseTable
            body={flattedListDaas}
            header={checkPermissionHeaderItem(
              userPermissions,
              KnowledgeManagementHeaderItem
            )}
            loading={isLoading}
            pagination={paginationProps}
            onClick={handleOnClickRow}
            isMobile={width <= 760}
          />
        ) : (
          <div className="text-center">{error}</div>
        )}
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="content"
        icon={PhPlayDuotone}
        title={t('knowledgeManagement.recoardeActivite')}
        descriptionInfo={t('knowledgeManagement.recordedUserActivate')}
        content={
          <VideoLoadingSkelton isLoading={videoFile?.loading}>
            <div className="w-[21.25rem] sm:w-[46.8rem]">
              {videoFile?.file ? (
                <video width="750" height="500" controls>
                  <track kind="captions" />
                  <source src={videoFile.file} type="video/mp4" />
                  {t('knowledgeManagement.videoSrcError')}
                </video>
              ) : (
                <NoResult />
              )}
            </div>
          </VideoLoadingSkelton>
        }
      />
    </>
  );
}
