import trashIcon from '@iconify-icons/ph/trash';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';

export const extensionListHeaderItem: IHeaderTable[] = [
  {
    label: '',
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: trashIcon,
        color: 'redNoBg',
      },
    ],

    dir: '',
    class: 'px-3 w-3/12',
  },
  {
    label: 'table.string',
    id: 'mimetype_list',
    type: 'tooltip',
    dir: '',
    class: 'px-3 w-4/12',
  },
  {
    label: 'table.fileExtension',
    id: 'extension_list',
    type: 'none',
    dir: '',
    class: 'px-3 w-3/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'function',
    function: dateAndNumber,
    dir: '',
    class: 'px-3 w-3/12',
  },
];
