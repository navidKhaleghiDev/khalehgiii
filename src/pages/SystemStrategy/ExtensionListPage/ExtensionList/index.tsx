import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { HTTP_ANALYSES } from '@src/services/http';
import { Modal } from '@ui/molecules/Modal';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_ANALYZE_MIME_TYPE } from '@src/services/analyze/endpoint';
import { API_ANALYZE_MIME_TYPE_DELETE } from '@src/services/analyze';
import { MimeType } from '@src/services/analyze/types';

import { BaseTable } from '@ui/molecules/BaseTable';
import { FilterTableList } from '@ui/Templates/FilterTableLIst';
import { StringifyProperties } from '@src/types/global';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import {
  ActionOnClickActionsType,
  OnClickActionsType,
} from '@ui/molecules/BaseTable/types';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { useGetPagination } from '@src/services/http/httpClient';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';

import { extensionListHeaderItem } from '../constants/extensionListHeaderItem';
import { UploadFileModal } from '../UploadMimeType';

const PAGE_SIZE = 8;
const PAGE = 1;

export function ExtensionList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openModal, setOpenModal] = useState<ActionOnClickActionsType>();
  const [mimeType, setMimeType] = useState<
    MimeType | StringifyProperties<MimeType>
  >();
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const { width } = useWindowDimensions();
  const userPermissions = useUserPermission();
  const { t } = useTranslation();

  // MimeType extension for the service
  const endpoint = createAPIEndpoint({
    endPoint: E_ANALYZE_MIME_TYPE,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });
  const { count, resultData, isLoading, mutate } = useGetPagination<MimeType>(
    endpoint,
    HTTP_ANALYSES.fetcherSWR
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handelSearchQuery = useCallback((value: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(value);
  }, []);

  const handleOnDeleteFileType = async () => {
    if (!mimeType) return;
    setLoadingButtonModal(true);

    await API_ANALYZE_MIME_TYPE_DELETE(mimeType?.id as number)
      .then(() => {
        mutate();
        toast.success(t('global.successfullyRemoved'));
        setOpenModal('delete');
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  const handleCloseUpdateModal = (isMutate?: boolean) => {
    if (isMutate) {
      mutate();
    }
    setOpenModal('mutate');
  };

  const handleOnClickActions: OnClickActionsType<MimeType> | undefined = (
    action,
    fileType
  ) => {
    setMimeType(fileType);
    setOpenModal(action);
  };

  const paginationProps = {
    countPage: count,
    currentPage,
    totalPages: Math.ceil(count / PAGE_SIZE),
    onPageChange: handlePageChange,
    paginationLabel: t('global.format'),
    allItems: count,
    itemsPer: resultData.length,
  };

  return (
    <>
      <div className="mb-[1.875rem]">
        <FilterTableList
          handelSearchQuery={handelSearchQuery}
          searchPlaceholder={t('systemManagement.search')}
          searchQuery={filterQuery}
          buttonLabel={t('systemManagement.newFormat')}
          onClickButton={() => setOpenModal('edit')}
        />
      </div>
      <BaseTable
        body={resultData}
        header={checkPermissionHeaderItem(
          userPermissions,
          extensionListHeaderItem
        )}
        loading={isLoading}
        pagination={paginationProps}
        onClick={handleOnClickActions}
        isMobile={width <= 765}
      />
      <Modal
        open={openModal === 'delete'}
        setOpen={() => setOpenModal('mutate')}
        type="error"
        size="responsive"
        title={t('systemManagement.deleteFormat')}
        description={t('systemManagement.deleteFormatText')}
        buttonOne={{
          label: t('systemManagement.deleteFormat'),
          onClick: handleOnDeleteFileType,
          loading: loadingButtonModal,
          color: 'red',
        }}
        buttonTow={{
          label: t('global.cancel'),
          onClick: () => setOpenModal('mutate'),
          color: 'tertiary',
        }}
      />
      <Modal
        open={openModal === 'edit'}
        setOpen={() => setOpenModal('mutate')}
        type="content"
        icon={PhUploadSimple}
        title={t('systemManagement.uploadFile')}
        descriptionInfo={t('systemManagement.uploadFileText')}
        content={<UploadFileModal handleClose={handleCloseUpdateModal} />}
        classContainer="w-[21.875rem] md:w-[39.68rem]"
      />
    </>
  );
}
