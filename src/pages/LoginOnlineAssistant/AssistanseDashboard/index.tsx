import { useRef } from 'react';
import { useUserContext } from '@context/user/userContext';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { AssistantGroupDetail } from './AssistantGroupDetail';

export function AssistanseDashboard() {
  const tabsRef = useRef();
  const { user } = useUserContext();

  const admins = user?.admin_group_of ? user?.admin_group_of : '';

  return (
    <ContainerDashboard>
      <div className="flex w-full">
        <BaseTabs ref={tabsRef}>
          {Array.isArray(admins) &&
            admins.map((adminGroup) => {
              const label = Object.keys(adminGroup) as unknown as string;
              const id = Object.values(adminGroup)[0].toString();

              return (
                <BaseTab key={adminGroup} label={label}>
                  {id && <AssistantGroupDetail id={id} />}
                </BaseTab>
              );
            })}
        </BaseTabs>
      </div>
    </ContainerDashboard>
  );
}
