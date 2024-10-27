/* eslint-disable @typescript-eslint/no-use-before-define */
import { useCallback, useState } from 'react';
import { API_DAAS_DELETE, API_DAAS_UPDATE } from '@src/services/users';
import { IDaAs } from '@src/services/users/types';
import { Modal } from '@ui/molecules/Modal';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';

import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
// import { BaseTable } from '@ui/atoms/BaseTable';
import { useNavigate } from 'react-router-dom';
import {
  ActionOnClickActionsType,
  OnClickActionsType,
} from '@ui/atoms/BaseTable/types';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { desktopListHeaderItem } from '@src/pages/DashboardDesktopList/DaAsList/constants/desktopListHeaderItem';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { EPermissionDaas } from '@src/types/permissions';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';

import { BaseTable } from '@ui/atoms/BaseTable';
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

const PAGE_SIZE = 8;
const PAGE = 1;

export function DaAsList() {
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeDaas, setActiveDaas] = useState<Partial<IDaAs>>();
  const [actionOnClick, setActionOnClick] =
    useState<ActionOnClickActionsType>();
  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [openOnlineAssistanceModal, setOpenOnlineAssistanceModal] =
    useState(false);

  const userPermissions = useUserPermission();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const mutateConfigUserDass = useCallback(() => {
    mutate(
      (key) => typeof key === 'string' && key.startsWith(E_USERS_DAAS),
      undefined,
      { revalidate: true }
    );
  }, [mutate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 2000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handleOnClickActions: OnClickActionsType<IDaAs> | undefined = (
    action,
    fileType
  ) => {
    const id = fileType?.id;
    if (action === 'mutate') {
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/users/daas'),
        undefined,
        { revalidate: true }
      );
      return;
    }
    if (action === 'more') {
      // we neded to do somthing
      navigate(`${ROUTES_PATH.dashboardSessionRecording}/${id}`);

      return;
    }
    if (action === 'edit') {
      setActiveDaas(fileType as IDaAs);
      setOpenSettingModal(true);
      return;
    }

    if (action === 'editLock') {
      setActiveDaas(fileType as IDaAs);
      setOpenModal(true);
      return;
    }

    if (fileType !== undefined && typeof fileType !== 'string') {
      setActionOnClick(action);
      setActiveDaas(fileType as IDaAs);
      setOpenModal(true);
    }
    if (action === 'details') {
      setActiveDaas(fileType as IDaAs);
      setOpenOnlineAssistanceModal(true);
    }
  };

  const handleOnRequests = async () => {
    if (!activeDaas) return;

    setLoadingButtonModal(true);
    if (actionOnClick === 'delete') {
      await API_DAAS_DELETE(activeDaas.id as string)
        .then(() => {
          toast.success(t('global.successfullyRemoved'));
          setOpenModal(false);
          mutateConfigUserDass();
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
    } else {
      updateDaas(activeDaas);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        mutateConfigUserDass();
        toast.success(t('global.sucessfulyUpdated'));
        if (openModal) setOpenModal(false);
        if (openSettingModal) setOpenSettingModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };
  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };
  const resetPermission = checkPermission(
    userPermissions,
    EPermissionDaas.CHANGE
  );

  const searchBarProps: TSearchBar = {
    name: 'search',
    value: filterQuery,
    handleSearchInput: handleFilterChange,
    componentProps: resetPermission
      ? {
          type: 'actionRefresh',
        }
      : undefined,
  };

  return (
    <div className={`w-full p-4 ${isLoading ? 'loading' : ''}  `}>
      <BaseTable
        loading={isLoading}
        headers={checkPermissionHeaderItem(
          userPermissions,
          desktopListHeaderItem
        )}
        bodyList={listDaas}
        onClick={handleOnClickActions}
        pagination={paginationProps}
        searchBar={searchBarProps}
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: handleOnRequests,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setOpenModal(false),
          color: 'red',
        }}
      />
      <Modal
        open={openSettingModal}
        setOpen={setOpenSettingModal}
        type="success"
        content={
          <SettingDaasModal
            handleOnChange={(daas) => updateDaas(daas, true)}
            daas={activeDaas as IDaAs}
            userPermissions={userPermissions}
          />
        }
      />
      <Modal
        open={openOnlineAssistanceModal}
        setOpen={setOpenOnlineAssistanceModal}
        type="success"
        content={<OnlineAssistanceDetailModal daas={activeDaas as IDaAs} />}
      />
    </div>
  );
}
