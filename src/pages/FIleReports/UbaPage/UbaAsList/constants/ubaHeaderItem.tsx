import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@redesignUi/molecules/BaseTable/types';
import DownloadSimple from '@iconify-icons/ph/download-simple';
import UploadSimple from '@iconify-icons/ph/upload-simple';
import { Uba } from '@src/services/analyze/types';
import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';

export const ubaHeaderItem: HeaderTable[] = [
  {
    type: 'avatar',
    email: 'username',
    id: 'username',
    isActive: 'true',
    label: 'table.nameOfTheUser',
    class: 'px-2 xl:w-2/12 lg:w-3/12 w-2/12',
  },
  {
    label: 'table.unauthorizedBehavior',
    id: 'malbehave_count',
    type: 'none',
    class: 'px-3 lg:w-1/12 w-2/12 rtl:text-right ltr:text-left lg:text-center',
    isMobileCollapsed: true,
  },
  {
    label: 'table.action',
    id: 'transmission_type',
    type: 'component',
    component: (props: BaseTableComponentCellProps<Uba>) => (
      <TagHelperCell
        title={
          props.row.transmission_type === 'upload'
            ? 'table.upload'
            : 'table.download'
        }
        icon={
          props.row.transmission_type === 'upload'
            ? UploadSimple
            : DownloadSimple
        }
        translate
        color={props.row.transmission_type === 'upload' ? 'purple' : 'blue'}
      />
    ),
    class: 'px-3 xl:w-1/12 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.status',
    id: 'is_ban',
    type: 'component',
    component: (props: BaseTableComponentCellProps<Uba>) => (
      <TagHelperCell
        title={props.row.is_ban ? 'table.block' : 'table.active'}
        translate
        color={props.row.is_ban ? 'yellow' : 'teal'}
      />
    ),
    class: 'px-3 w-1/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.realName',
    id: 'original_file_name',
    type: 'none',
    class: 'px-3 lg:w-1/12 w-1/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.updatedNames',
    id: 'file_names',
    type: 'none',
    class: 'px-3 lg:w-3/12 w-1/12',
    isMobileCollapsed: true,
  },
];