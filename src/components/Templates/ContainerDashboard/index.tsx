import { PropsWithChildren } from 'react';

export function ContainerDashboard({ children }: PropsWithChildren) {
  return <div className="w-full flex flex-col h-full p-16">{children}</div>;
}
