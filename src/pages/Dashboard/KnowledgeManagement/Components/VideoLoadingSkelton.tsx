import { PropsWithChildren } from 'react';

type VideoLoadingSkeltonProps = PropsWithChildren<{ isLoading?: boolean }>;

export function VideoLoadingSkelton({
  isLoading,
  children,
}: VideoLoadingSkeltonProps) {
  console.log(isLoading);
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-[46.8rem] h-[31.25rem] bg-gray-500 rounded-t-2xl mb-1" />
      </div>
    );
  }
  return children;
}
