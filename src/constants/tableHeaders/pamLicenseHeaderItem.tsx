import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { BaseTableSwitch } from '@ui/organisms/Navbar/NavbarDashboard/HeadDescription/BaseTableSwitch';

export const licenseTrueStatusHeaderItem: IHeaderTable[] = [
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
        name="is_recording"
        id={props.row.id as any}
        value={props.row.daas_configs.is_recording as any}
        onClick={props.onClick}
      />
    ),
    class: 'px-3 w-6/12',
  },
];
