import useSWR from 'swr';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import FilterTableList from '@redesignUi/Templates/FilterTableLIst';
import { Modal } from '@redesignUi/molecules/Modal';
import { LoadingWrapper } from '@ui/molecules/Loading/LoadingWrapper';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { NoResult } from '@ui/molecules/NoResult';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_ONLINE_ASSISTANCE } from '@src/services/users/endpoint';
import { OnlineAssistanceModel } from '@src/services/users/types';
import { createAPIEndpoint } from '@src/helper/utils';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { KnowledgeManagementHeaderItem } from '@src/pages/Dashboard/KnowledgeManagement/constants';
import { API_KNOWLEDGE_MANAGEMENT } from '@src/services/users';
import useWindowDimensions from '@src/helper/hooks/useWindowDimensions';

const PAGE_SIZE = 8;
const PAGE = 1;

export function KnowledgeManagementList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  // This functionality is handling the groupe locally
  // const [filterGroupe, setFilterGroupe] = useState<
  //   OptionSelect | OptionSelect[] | null
  // >();
  const [openModal, setOpenModal] = useState(false);
  const [videoFile, setVideoFile] = useState<{
    loading?: boolean;
    file?: any;
  } | null>(null);

  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  // Handel API request this does not work or ask what are u searching about it
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
    setOpenModal(true);
    setVideoFile({ loading: true });

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

  return (
    <>
      <div className="mb-[1.875rem]">
        <FilterTableList
          handelSearchQuery={handelSearchQuery}
          searchQuery={filterQuery}
          handelGroupeFilter={(option) => console.log(option)}
          domainFilter
          searchPlaceholder={t('fileScan.adminSearch')}
        />
      </div>
      <BaseTable
        body={listDaas}
        header={checkPermissionHeaderItem(
          userPermissions,
          KnowledgeManagementHeaderItem
        )}
        loading={isLoading}
        pagination={paginationProps}
        onClick={handleOnClickRow}
        isMobile={width <= 760}
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="content"
        content={
          <LoadingWrapper isLoading={videoFile?.loading}>
            <div className="w-full">
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
          </LoadingWrapper>
        }
      />
    </>
  );
}
