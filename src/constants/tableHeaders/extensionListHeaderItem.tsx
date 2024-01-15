import trashIcon from '@iconify-icons/ph/trash';
import { dateAndNumber } from '@src/helper/utils/dateUtils';

export function extensionListHeaderItem() {
  return [
    {
      label: '',
      id: 'id',
      type: 'action',
      action: [
        {
          action: 'delete',
          icon: trashIcon,
          color: 'redNoBg',
          style: '',
        },
      ],

      dir: '',
      style: 'px-3 w-2/12',
    },
    {
      label: 'table.string',
      id: 'mimetype_list',
      type: 'none',
      dir: '',
      style: 'px-3 w-4/12',
      size: 'body4',
    },
    {
      label: 'table.fileExtension',
      id: 'extension_list',
      type: 'none',
      dir: '',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
    {
      label: 'table.dateOfCreated',
      id: 'created_at',
      type: 'function',
      function: dateAndNumber,
      dir: '',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
  ];
}
