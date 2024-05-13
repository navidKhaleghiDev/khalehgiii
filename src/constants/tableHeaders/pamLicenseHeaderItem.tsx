import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { LicenseStatusForm } from '@ui/organisms/Navbar/NavbarDashboard/HeadDescription/LicenseStatusForm';

export const licenseTrueStatusHeaderItem: IHeaderTable[] = [
  {
    label: 'table.nameOfTheUser',
    id: 'email',
    type: 'tooltip',
    class: 'px-3 w-6/12',
  },
  {
    label: 'table.realName',
    id: 'daas_configs.is_recording',
    type: 'component',
    component: (props: any) => (
      <LicenseStatusForm
        id={props.row.id as any}
        name={props.row.daas_configs.is_recording as any}
        onClick={props.onClick}
      />
    ),
    class: 'px-3 w-6/12',
  },
];
