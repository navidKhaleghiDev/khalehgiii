import { dateAndNumber } from '@src/helper/utils/dateUtils';
import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { HeaderItem } from '@ui/atoms/BaseTable/BaseTableTypes';

export const ubaHeaderItem: HeaderItem[] = [
  {
    label: 'table.nameOfTheUser',
    id: 'username',
    type: 'none',
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.dateOfUpdated',
    id: 'updated_at',
    type: 'function',
    function: dateAndNumber,
    dir: 'rtl',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.realName',
    id: 'original_file_name',
    type: 'none',
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.updatedNames',
    id: 'file_names',
    type: 'tooltip',
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.unauthorizedBehavior',
    id: 'malbehave_count',
    type: 'none',
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.blocked',
    id: 'is_ban',
    type: 'icon',
    icon: [lockKeyFillIcon, lockKeyOpenFillIcon],
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.action',
    id: 'transmission_type',
    type: 'none',
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
];
