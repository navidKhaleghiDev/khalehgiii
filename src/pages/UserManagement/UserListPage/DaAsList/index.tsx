import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import Play from '@iconify-icons/ph/play';
import UsersThree from '@iconify-icons/ph/users-three';
import { API_DAAS_DELETE, API_DAAS_UPDATE } from '@src/services/users';
import { IDaAs } from '@src/services/users/types';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { Modal } from '@redesignUi/molecules/Modal';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import userFocus from '@iconify-icons/ph/user-focus';

import { SettingDaasModal } from './SettingDaasModal';
import { OnlineAssistanceDetailModal } from './OnlineAssistantDetailModal';
import { desktopListHeaderItem } from './constants/desktopListHeaderItem';
import { SessionRecordingList } from './SessionRecording/SessionRecordingList';

function compareExtensionLists(
  oldList?: Record<string, number>,
  newList?: Record<string, number>
) {
  const removedList: Record<string, number> = {};
  const addedList: Record<string, number> = {};

  if (!oldList || !newList) return { addedList, removedList };

  Object.keys(oldList).forEach((key) => {
    if (!(key in newList)) {
      removedList[key] = oldList[key];
    }
  });

  Object.keys(newList).forEach((key) => {
    if (!(key in oldList) || newList[key] !== oldList[key]) {
      addedList[key] = newList[key];
    }
  });

  return { addedList, removedList };
}

const PAGE_SIZE = 6;
const PAGE = 1;
interface DaAsListProps {
  showLockedUsers: boolean;
  showOnlineUsers: boolean;
}
export function DaAsList({ showLockedUsers, showOnlineUsers }: DaAsListProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeDaas, setActiveDaas] = useState<Partial<IDaAs>>();
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [activeModal, setActiveModal] = useState<
    | 'deleteUser'
    | 'blockUser'
    | 'setting'
    | 'sessionRecording'
    | 'onlineAssistance'
    | null
  >(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  const userPermissions = useUserPermission();
  const windowsDimensions = useWindowDimensions();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
    lockFilter: showLockedUsers,
    onlineFilter: showOnlineUsers,
  });

  const { data, isLoading, mutate } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handleOnClickActions: OnClickActionsType<IDaAs> = (
    action,
    userDaas
  ) => {
    setActiveDaas(userDaas as IDaAs);
    const id = userDaas?.id;
    switch (action) {
      case 'more':
        if (id) {
          setSelectedId(id);
          setActiveModal('sessionRecording');
          setUserName(userDaas.email);
        }
        break;
      case 'edit':
        setActiveModal('setting');
        break;
      case 'editLock':
        setActiveModal('blockUser');
        break;
      case 'details':
        setActiveModal('onlineAssistance');
        break;
      case 'delete':
        if (id) {
          setActiveModal('deleteUser');
        }
        break;
      default:
        break;
      // do nothing
    }
  };
  const updateDaas = async (daas?: Partial<IDaAs>, isLdp?: boolean) => {
    if (!daas) return;
    let daasUpdated = daas;

    if (isLdp) {
      const resultDownload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_download ?? {},
        daas?.allowed_files_type_for_download ?? {}
      );

      const resultUpload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_upload ?? {},
        daas?.allowed_files_type_for_upload ?? {}
      );

      // Handling added items for download
      const newExtraAllowedDownloadFiles = {
        ...daas.extra_allowed_download_files,
      };

      const newForbiddenDownloadFiles = new Set(
        daas.forbidden_download_files || []
      );

      Object.entries(resultDownload.addedList).forEach(([key, size]) => {
        if (newForbiddenDownloadFiles.has(key)) {
          newForbiddenDownloadFiles.delete(key);
        }
        newExtraAllowedDownloadFiles[key] = size;
      });

      // Handling removed items for download
      Object.keys(resultDownload.removedList).forEach((key) => {
        delete newExtraAllowedDownloadFiles[key];
        newForbiddenDownloadFiles.add(key);
      });

      // Handling added items for upload
      const newExtraAllowedUploadFiles = { ...daas.extra_allowed_upload_files };
      const newForbiddenUploadFiles = new Set(
        daas.forbidden_upload_files || []
      );

      Object.entries(resultUpload.addedList).forEach(([key, size]) => {
        if (newForbiddenUploadFiles.has(key)) {
          newForbiddenUploadFiles.delete(key);
        }
        newExtraAllowedUploadFiles[key] = size;
      });

      // Handling removed items for upload
      Object.keys(resultUpload.removedList).forEach((key) => {
        delete newExtraAllowedUploadFiles[key];
        newForbiddenUploadFiles.add(key);
      });

      daasUpdated = {
        ...daas,
        allowed_files_type_for_upload: {
          ...daas.allowed_files_type_for_upload,
        },
        allowed_files_type_for_download: {
          ...daas.allowed_files_type_for_download,
        },
        extra_allowed_download_files: newExtraAllowedDownloadFiles,
        extra_allowed_upload_files: newExtraAllowedUploadFiles,
        forbidden_download_files: Array.from(newForbiddenDownloadFiles),
        forbidden_upload_files: Array.from(newForbiddenUploadFiles),
      };
    }

    // get
    await API_DAAS_UPDATE(daasUpdated.id as string, daasUpdated)
      .then(() => {
        mutate();
        toast.success(t('global.sucessfulyUpdated'));
        setActiveModal(null);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  const handleOnBlock = () => {
    setLoadingButtonModal(true);
    updateDaas(activeDaas);
  };
  const handleOnRequests = async () => {
    if (!activeDaas) return;
    setLoadingButtonModal(true);

    await API_DAAS_DELETE(activeDaas.id as string)
      .then(() => {
        toast.success(t('global.successfullyRemoved'));
        mutate();
        setActiveModal(null);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationProps = {
    countPage,
    currentPage,
    allItems: 10,
    itemsPer: PAGE_SIZE,
    paginationLabel: t('header.user'),
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  const handelSearchQuery = useCallback((value: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(value);
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">
      <FilterTableList
        searchQuery={filterQuery}
        searchPlaceholder={t('userList.searchUsers')}
        handelSearchQuery={handelSearchQuery}
      />
      <BaseTable
        loading={isLoading}
        header={checkPermissionHeaderItem(
          userPermissions,
          desktopListHeaderItem
        )}
        body={listDaas}
        onClick={handleOnClickActions}
        pagination={paginationProps}
        isMobile={windowsDimensions.width <= 768}
      />
      <Modal
        size="responsive"
        open={activeModal === 'deleteUser'}
        setOpen={() => setActiveModal(null)}
        type="error"
        title={t('global.deleteUser')}
        description={t('global.sureAboutDeleteUser')}
        buttonOne={{
          label: t('global.deleteUser'),
          onClick: handleOnRequests,
          loading: loadingButtonModal,
          color: 'red',
        }}
        buttonTow={{
          label: t('global.cancel'),
          onClick: () => setActiveModal(null),
          color: 'tertiary',
        }}
      />
      <Modal
        size="responsive"
        open={activeModal === 'blockUser'}
        setOpen={() => setActiveModal(null)}
        type="info"
        title={t('table.userStatus')}
        description={
          activeDaas?.is_lock
            ? t('userList.areYouSureBlock')
            : t('userList.areYouSureUnBlock')
        }
        buttonOne={{
          label: t('global.yes'),
          onClick: handleOnBlock,
          loading: loadingButtonModal,
          color: 'teal',
        }}
        buttonTow={{
          label: t('global.cancel'),
          onClick: () => setActiveModal(null),
          color: 'tertiary',
        }}
      />
      <Modal
        classContainer="md:max-h-[45.625rem] max-h-[36.875rem]"
        size="lg"
        open={activeModal === 'sessionRecording'}
        setOpen={() => setActiveModal(null)}
        type="content"
        content={<SessionRecordingList id={selectedId} username={userName} />}
        icon={Play}
        title={t('userList.recordedActivities')}
        descriptionInfo={`${t('userList.recordedUserActivities')} ${userName}`}
      />
      <Modal
        type="content"
        size="lg"
        title={t('userList.userAccess')}
        descriptionInfo={t('userList.changeUserProfileAndAccessList')}
        icon={userFocus}
        open={activeModal === 'setting'}
        setOpen={() => setActiveModal(null)}
        content={
          <SettingDaasModal
            handleOnChange={(daas) => updateDaas(daas, true)}
            daas={activeDaas as IDaAs}
            userPermissions={userPermissions}
            setOpenSettingModal={() => setActiveModal(null)}
          />
        }
      />
      <Modal
        classContainer="md:max-h-[45.625rem] max-h-[36.875rem]"
        size="lg"
        open={activeModal === 'onlineAssistance'}
        setOpen={() => setActiveModal(null)}
        type="content"
        content={<OnlineAssistanceDetailModal daas={activeDaas as IDaAs} />}
        icon={UsersThree}
        title={t('userList.assistance')}
      />
    </div>
  );
}