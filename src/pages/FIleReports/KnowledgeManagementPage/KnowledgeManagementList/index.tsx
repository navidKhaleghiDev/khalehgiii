import useSWR from 'swr';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import PhPlayDuotone from '@iconify-icons/ph/play-duotone';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import FilterTableList from '@redesignUi/Templates/FilterTableLIst';
import { Modal } from '@redesignUi/molecules/Modal';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { NoResult } from '@ui/molecules/NoResult';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_ONLINE_ASSISTANCE } from '@src/services/users/endpoint';
import { OnlineAssistanceModel } from '@src/services/users/types';
import { createAPIEndpoint } from '@src/helper/utils';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { API_KNOWLEDGE_MANAGEMENT } from '@src/services/users';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { VideoLoadingSkelton } from '../Components/VideoLoadingSkelton';
import { KnowledgeManagementHeaderItem } from '../constants';

const PAGE_SIZE = 8;
const PAGE = 1;

export function KnowledgeManagementList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [videoFile, setVideoFile] = useState<{
    loading?: boolean;
    file?: string;
  } | null>(null);
  // This functionality is handling the groupe locally
  // const [filterGroupe, setFilterGroupe] = useState<
  //   OptionSelect | OptionSelect[] | null
  // >();

  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_ONLINE_ASSISTANCE,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading } = useSWR<
    IResponsePagination<OnlineAssistanceModel>
  >(endpoint, http.fetcherSWR);

  const handleOnClickRow: OnClickActionsType<OnlineAssistanceModel> = async (
    _,
    row
  ) => {
    setVideoFile({ loading: true });

    await API_KNOWLEDGE_MANAGEMENT(row?.id as string)
      .then((res) => {
        setOpenModal(true);
        const blob = new Blob([res.data], { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        setVideoFile({ loading: false, file: videoURL });
      })
      .catch((err) => {
        toast.error(
          err.message ?? 'error on get video of knowledge management'
        );
        setOpenModal(false);
      });
  };
  const handelSearchQuery = useCallback((value: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(value);
  }, []);

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    paginationLabel: t('header.admin'),
    allItems: countPage,
    itemsPer: listDaas.length,
    onPageChange: (page: number) => setCurrentPage(page),
  };

  // This functionality is handling the groupe locally
  // const filterListDass = listDaas
  //   ? listDaas.filter((item) =>
  //       item.group_name?.some((itemMember) =>
  //         Object.keys(itemMember).includes(filterList as string)
  //       )
  //     )
  //   : listDaas;

  const flattedListDass = listDaas?.map((item) => ({
    ...item,
    admin_email: item.admin.email,
    user_email: item.user.email,
  }));

  return (
    <>
      <FilterTableList
        handelSearchQuery={handelSearchQuery}
        searchQuery={filterQuery}
        handelGroupeFilter={(option) => console.log(option)}
        domainFilter
        searchPlaceholder={t('fileScan.adminSearch')}
      />
      <div className="mt-[1.875rem]">
        <BaseTable
          body={flattedListDass}
          header={checkPermissionHeaderItem(
            userPermissions,
            KnowledgeManagementHeaderItem
          )}
          loading={isLoading}
          pagination={paginationProps}
          onClick={handleOnClickRow}
          isMobile={width <= 760}
        />
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
            <div className="w-[21.25rem] sm:w-full">
              {videoFile?.file ? (
                <video width="750" height="500" controls>
                  <track kind="captions" />
                  <source src={videoFile.file} type="video/mp4" />
                  Your browser does not support the video tag.
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
