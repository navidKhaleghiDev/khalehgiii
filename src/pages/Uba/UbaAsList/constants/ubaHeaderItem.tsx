import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@redesignUi/molecules/BaseTable/types';
import DownloadSimple from '@iconify-icons/ph/download-simple';
import UploadSimple from '@iconify-icons/ph/upload-simple';
import { TextBG } from '@redesignUi/molecules/BaseTable/components/CustomCell/TextBG';
import { TextIcon } from '@redesignUi/molecules/BaseTable/components/CustomCell/TextIcon';
import { Uba } from '@src/services/analyze/types';

export const ubaHeaderItem: HeaderTable[] = [
  {
    type: 'avatar',
    email: 'username',
    id: 'username',
    isActive: 'true',
    label: 'table.nameOfTheUser',
    class: 'px-3 lg:w-3/12 sm:w-4/12',
  },
  {
    label: 'table.action',
    id: 'transmission_type',
    type: 'component',
    component: (props: BaseTableComponentCellProps<Uba>) => (
      <TextIcon
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
    class: 'px-3 lg:w-1/12 sm:w-[6.25rem]',
    isMobileCollapsed: true,
  },
  {
    label: 'table.unauthorizedBehavior',
    id: 'malbehave_count',
    type: 'none',
    class: 'px-3 xl:w-1/12 lg:w-2/12 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.realName',
    id: 'original_file_name',
    type: 'none',
    class: 'px-3 lg:w-2/12 sm:w-[6.25rem]',
    isMobileCollapsed: true,
  },
  {
    label: 'table.updatedNames',
    id: 'file_names',
    type: 'none',
    class: 'px-3 w-2/12 lg:max-w-full max-w-36',
    isMobileCollapsed: true,
  },
  {
    label: 'table.status',
    id: 'is_ban',
    type: 'component',
    component: (props: BaseTableComponentCellProps<Uba>) => (
      <TextBG
        title={props.row.is_ban ? 'table.block' : 'table.active'}
        translate
        color={props.row.is_ban ? 'yellow' : 'teal'}
      />
    ),
    class: 'px-3 lg:w-2/12 sm:w-[6.25rem]',
    isMobileCollapsed: true,
  },
];
