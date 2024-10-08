import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { Lock } from '@ui/atoms/BaseTable/components/tableIcons/Lock';

export const ubaHeaderItem: IHeaderTable[] = [
  {
    label: 'table.nameOfTheUser',
    id: 'username',
    type: 'none',

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.dateOfUpdated',
    id: 'updated_at',
    type: 'function',
    function: dateAndNumber,
    dir: 'rtl',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.realName',
    id: 'original_file_name',
    type: 'tooltip',

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.updatedNames',
    id: 'file_names',
    type: 'tooltip',

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.unauthorizedBehavior',
    id: 'malbehave_count',
    type: 'none',

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.blocked',
    id: 'is_ban',
    type: 'component',
    component: (props: any) => <Lock id={props.row.is_ban} />,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.action',
    id: 'transmission_type',
    type: 'none',

    class: 'px-3 w-2/12',
  },
];
