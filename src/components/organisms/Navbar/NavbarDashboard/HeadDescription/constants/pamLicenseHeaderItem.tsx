import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { EPermissionDaas } from '@src/types/permissions';
import { BaseTableSwitch } from '@ui/atoms/BaseTable/components/BaseTableSwitch';

export const licenseTrueStatusHeaderItem: HeaderTable[] = [
  {
    label: 'table.nameOfTheUser',
    id: 'email',
    type: 'none',
    class: 'px-3 w-6/12',
  },
  {
    label: 'table.activeDeactive',
    id: 'daas_configs.is_recording',
    type: 'component',
    component: (props: any) => (
      <BaseTableSwitch
        name={props.row.id}
        value={props.row}
        onClick={props.onClick}
      />
    ),
    permission: EPermissionDaas.CHANGE,

    class: 'px-3 w-6/12',
  },
];
