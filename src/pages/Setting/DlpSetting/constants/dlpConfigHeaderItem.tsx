import { dateAndNumber } from '@src/helper/utils/dateUtils';
import {
  EPermissionUsers,
  EPermissionWhiteListFiles,
} from '@src/types/permissions';
import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@redesignUi/molecules/BaseTable/types';
import { IconFile } from '@src/pages/Setting/DlpSetting/component/IconType';
import { FileTypeProp } from '@src/pages/Setting/type';
import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';
import DownloadSimple from '@iconify-icons/ph/download-simple';
import UploadSimple from '@iconify-icons/ph/upload-simple';
import Trash from '@iconify-icons/ph/trash-simple';
import NotePencil from '@iconify-icons/ph/pencil-simple';

export const dlpConfigHeaderItem: HeaderTable[] = [
  {
    label: 'table.fileType',
    id: 'file_type',
    component: (props: any) => <IconFile fileType={props.row.file_type} />,
    type: 'component',
    class: 'px-3 w-4/12 md:w-2/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'date',
    isMobileCollapsed: true,
    function: dateAndNumber,
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },

  {
    label: 'table.status',
    id: 'is_active',
    type: 'component',
    component: (props: BaseTableComponentCellProps<FileTypeProp>) => (
      <TagHelperCell
        title={props.row.is_active ? 'table.active' : 'table.deactive'}
        translate
        color={props.row.is_active ? 'teal' : 'yellow'}
      />
    ),
    isMobileCollapsed: true,

    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.permissions',
    id: ['allowed_for_download', 'allowed_for_upload'],
    type: 'component',
    isMobileCollapsed: true,
    component: (props: BaseTableComponentCellProps<FileTypeProp>) => (
      <div className="flex gap-x-[0.81rem]">
        {props.row.allowed_for_download ? (
          <TagHelperCell
            title="table.download"
            icon={DownloadSimple}
            translate
            color="blue"
          />
        ) : null}
        {props.row.allowed_for_upload ? (
          <TagHelperCell
            title="table.upload"
            icon={UploadSimple}
            translate
            color="purple"
          />
        ) : null}
      </div>
    ),
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },

  {
    id: 'action',
    type: 'menu',
    tooltip: 'table.moreDetail',
    menu: [
      {
        action: 'edit',
        icon: NotePencil,
        color: 'neutralNoBg',
        permission: EPermissionUsers.CHANGE,
        title: 'table.editFile',
      },
      {
        action: 'delete',
        icon: Trash,
        color: 'redNoBg',
        permission: EPermissionUsers.DELETE,
        title: 'table.deleteFile',
      },
    ],

    permission: [
      EPermissionWhiteListFiles.CHANGE,
      EPermissionWhiteListFiles.DELETE,
    ],

    class: 'px-3 w-7/12',
  },
];
