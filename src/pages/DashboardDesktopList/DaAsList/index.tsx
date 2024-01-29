/* eslint-disable @typescript-eslint/no-use-before-define */
import { useCallback, useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { API_DAAS_DELETE, API_DAAS_UPDATE } from '@src/services/users';
import { ETimeLimitDuration, IDaAs } from '@src/services/users/types';
import { Modal } from '@ui/molecules/Modal';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import Pagination from '@ui/molecules/Pagination';
import { createAPIEndpoint } from '@src/helper/utils';
import { debounce } from 'lodash';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { useTranslation } from 'react-i18next';
import { ResetAllAccessTime } from './ResetAllAccessTime';
import { ActionOnClickActionsType } from './DaAsCard/types';
import { SettingDaasModal } from './SettingDaasModal';

import { IHeaderDaasCard } from './types';
import { DaAsCard } from './DaAsCard';

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
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const [activeDaas, setActiveDaas] = useState<Partial<IDaAs>>();
  const [actionOnClick, setActionOnClick] =
    useState<ActionOnClickActionsType>();

  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);

  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 2000),
    []
  );

  const headerItem: IHeaderDaasCard = {
    email: t('table.email'),
    http_port: 'پورت http',
    https_port: 'پورت https',
    created_at: 'string',
    last_uptime: 'string',
    is_lock: t('table.desktop'),
    daas_configs: {
      is_globally_config: t('table.defaultSetting'),
      can_upload_file: t('table.accessSetting'),
      can_download_file: '',
      clipboard_down: '',
      clipboard_up: '',
      time_limit_duration: ETimeLimitDuration.DAILY,
      time_limit_value_in_hour: '',
      max_transmission_download_size: '0',
      max_transmission_upload_size: '0',
      webcam_privilege: 'false',
      microphone_privilege: 'false',
    },
    is_running: t('table.status'),
    usage_in_minute: t('table.usedTime'),
    extra_allowed_download_files: '',
    extra_allowed_upload_files: '',
    forbidden_upload_files: '',
    forbidden_download_files: '',
    allowed_files_type_for_download: '',
    allowed_files_type_for_upload: '',
    daas_version: t('table.desktopV'),
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  function handleOnClickActions(
    action: ActionOnClickActionsType,
    daas?: Partial<IDaAs> | string
  ): any {
    if (action === 'mutate') {
      mutate();
      return;
    }

    if (action === 'edit') {
      setActiveDaas(daas as IDaAs);
      setOpenSettingModal(true);
      return;
    }

    if (action === 'editLock') {
      setActiveDaas(daas as IDaAs);
      setOpenModal(true);
      return;
    }

    if (daas !== undefined && typeof daas !== 'string') {
      setActionOnClick(action);
      setActiveDaas(daas);
      setOpenModal(true);
    }
  }

  const handleOnRequests = async () => {
    if (!activeDaas) return;

    setLoadingButtonModal(true);
    if (actionOnClick === 'delete') {
      await API_DAAS_DELETE(activeDaas.id as string)
        .then(() => {
          mutate();
          toast.success(t('global.successfullyRemoved'));
          setOpenModal(false);
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
        mutate();
        toast.success(t('table.sucessfulyUpdated'));
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

  const DassCardContent = isLoading ? (
    <LoadingSpinner />
  ) : (
    (listDaas.length > 0 &&
      listDaas.map((item) => (
        <DaAsCard
          key={item.id}
          daas={item}
          // eslint-disable-next-line react/jsx-no-bind
          onClickActions={handleOnClickActions}
        />
      ))) || <NoResult />
  );

  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <div className="flex items-center justify-between">
        <SearchInput
          name="search-daas-list"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
        <ResetAllAccessTime />
      </div>
      <DaAsCard daas={headerItem} isHeader />
      {DassCardContent}
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / PAGE_SIZE)}
          onPageChange={handlePageChange}
        />
      )}
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
          />
        }
      />
    </div>
  );
}
