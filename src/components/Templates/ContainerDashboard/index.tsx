import { PropsWithChildren } from 'react';

export function ContainerDashboard({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex flex-col items-center p-16 2xl:container">
        {children}
      </div>
    </div>
  );
}
