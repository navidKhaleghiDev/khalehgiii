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
import { desktopListHeaderItem } from '@src/pages/DashboardDesktopList/DaAsList/constants/desktopListHeaderItem';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { SessionRecordingList } from '@src/pages/SessionRecording/SessionRecordingList';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { Modal } from '@redesignUi/molecules/Modal';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import FilterTableList from '@redesignUi/Templates/FilterTableLIst';
import userFocus from '@iconify-icons/ph/user-focus';

import { SettingDaasModal } from './SettingDaasModal';
import { OnlineAssistanceDetailModal } from './OnlineAssistantDetailModal';

function compareExtensionLists(oldList?: string[], newList?: string[]) {
  const removedList: string[] = [];
  const addedList: string[] = [];
  if (!oldList || !newList) return { addedList, removedList };

  const setOne = new Set(oldList);
  const setTwo = new Set(newList);

  // Find strings added
  newList.forEach((item) => {
    if (!setOne.has(item)) {
      addedList.push(item);
    }
  });

  // Find strings missing
  oldList.forEach((item) => {
    if (!setTwo.has(item)) {
      removedList.push(item);
    }
  });

  return {
    addedList,
    removedList,
  };
}

const PAGE_SIZE = 5;
const PAGE = 1;

export function DaAsList() {
  // const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeDaas, setActiveDaas] = useState<Partial<IDaAs>>();
  const [openModal, setOpenModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);

  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [openOnlineAssistanceModal, setOpenOnlineAssistanceModal] =
    useState(false);
  const [openSessionRecording, setOpenSessionRecording] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  const userPermissions = useUserPermission();
  const windowsDimensions = useWindowDimensions();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading, mutate } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handleOnClickActions: OnClickActionsType<IDaAs> | undefined = (
    action,
    fileType
  ) => {
    const id = fileType?.id;
    switch (action) {
      case 'more':
        if (id) {
          setSelectedId(id);
          setOpenSessionRecording(true);
          setUserName(fileType.email);
        }
        break;
      case 'edit':
        setActiveDaas(fileType as IDaAs);
        setOpenSettingModal(true);
        break;
      case 'editLock':
        setActiveDaas(fileType as IDaAs);
        setOpenBlockModal(true);
        break;
      case 'details':
        setActiveDaas(fileType as IDaAs);
        setOpenOnlineAssistanceModal(true);
        break;
      default:
        break;
      // do nothing
    }

    if (fileType !== undefined && typeof fileType !== 'string') {
      setActiveDaas(fileType as IDaAs);
      setOpenModal(true);
    }
  };

  const updateDaas = async (daas?: Partial<IDaAs>, isLdp?: boolean) => {
    if (!daas) return;
    let daasUpdated = daas;
    if (isLdp) {
      const resultDownload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_download ?? [],
        daas?.allowed_files_type_for_download ?? []
      );

      const resultUpload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_upload ?? [],
        daas?.allowed_files_type_for_upload ?? []
      );

      const newExtraAllowedDownloadFiles = [
        ...(daas.extra_allowed_download_files || []),
        ...resultDownload.addedList,
      ];
      const newForbiddenDownloadFiles = [
        ...(daas.forbidden_download_files || []),
        ...resultDownload.removedList,
      ];

      const newExtraAllowedUploadFiles = [
        ...(daas.extra_allowed_upload_files || []),
        ...resultUpload.addedList,
      ];
      const newForbiddenUploadFiles = [
        ...(daas.forbidden_upload_files || []),
        ...resultUpload.removedList,
      ];

      daasUpdated = {
        ...daas,
        extra_allowed_download_files: [
          ...new Set(newExtraAllowedDownloadFiles),
        ],
        extra_allowed_upload_files: [...new Set(newExtraAllowedUploadFiles)],
        forbidden_download_files: [
          ...new Set(newForbiddenDownloadFiles),
        ].filter((value) => !resultDownload.addedList.includes(value)),
        forbidden_upload_files: [...new Set(newForbiddenUploadFiles)].filter(
          (value) => !resultUpload.addedList.includes(value)
        ),
      };
    }

    // get
    await API_DAAS_UPDATE(daasUpdated.id as string, daasUpdated)
      .then(() => {
        mutate();
        toast.success(t('global.sucessfulyUpdated'));
        if (openBlockModal) setOpenBlockModal(false);
        if (openModal) setOpenModal(false);
        if (openSettingModal) setOpenSettingModal(false);
        if (openSessionRecording) setOpenSessionRecording(false);
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
    setOpenBlockModal(false);
  };
  const handleOnRequests = async () => {
    if (!activeDaas) return;
    setLoadingButtonModal(true);

    await API_DAAS_DELETE(activeDaas.id as string)
      .then(() => {
        toast.success(t('global.successfullyRemoved'));
        setOpenModal(false);
        mutate();
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
        domainFilter
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
        open={openModal}
        setOpen={setOpenModal}
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
          onClick: () => setOpenModal(false),
          color: 'tertiary',
        }}
      />
      <Modal
        size="responsive"
        open={openBlockModal}
        setOpen={setOpenBlockModal}
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
          onClick: () => setOpenBlockModal(false),
          color: 'tertiary',
        }}
      />
      <Modal
        classContainer="md:h-[45.625rem] h-[36.875rem]"
        size="lg"
        open={openSessionRecording}
        setOpen={setOpenSessionRecording}
        type="content"
        content={<SessionRecordingList id={selectedId} username={userName} />}
        icon={Play}
        title={t('userList.recordedActivities')}
        descriptionInfo={`${t('userList.recordedUserActivities')} ${userName}`}
      />
      <Modal
        type="content"
        title={t('userList.userAccess')}
        descriptionInfo={t('userList.changeUserProfileAndAccessList')}
        icon={userFocus}
        open={openSettingModal}
        setOpen={setOpenSettingModal}
        content={
          <SettingDaasModal
            handleOnChange={(daas) => updateDaas(daas, true)}
            daas={activeDaas as IDaAs}
            userPermissions={userPermissions}
            setOpenSettingModal={setOpenSettingModal}
          />
        }
      />
      <Modal
        classContainer="md:h-[45.625rem] h-[36.875rem]"
        size="lg"
        open={openOnlineAssistanceModal}
        setOpen={setOpenOnlineAssistanceModal}
        type="content"
        content={<OnlineAssistanceDetailModal daas={activeDaas as IDaAs} />}
        icon={UsersThree}
        title={t('userList.assistance')}
      />
    </div>
  );
}
