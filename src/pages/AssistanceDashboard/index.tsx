import { useRef } from 'react';
import { useUserContext } from '@context/user/userContext';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { AssistanceGroupDetail } from './AssistanceGroupDetail';

export function AssistanceDashboard() {
  const tabsRef = useRef();
  const { user } = useUserContext();

  const admins = user?.admin_group_of ? user?.admin_group_of : '';

  return (
    <ContainerDashboard>
      <div className="flex w-full">
        <BaseTabs ref={tabsRef}>
          {Array.isArray(admins) &&
            admins.map((adminGroup) => {
              const label = Object.keys(adminGroup)[0] as unknown as string;
              const id = Object.values(adminGroup)[0].toString();

              return (
                <BaseTab key={id} label={label}>
                  <AssistanceGroupDetail groupName={label} id={id} />
                </BaseTab>
              );
            })}
        </BaseTabs>
      </div>
    </ContainerDashboard>
  );
}
