import { PropsWithChildren } from 'react';

import { BaseIcon } from '@ui/atoms';
import PhPlayDuotone from '@iconify-icons/ph/play-duotone';

type VideoLoadingSkeltonProps = PropsWithChildren<{ isLoading?: boolean }>;

export function VideoLoadingSkelton({
  isLoading,
  children,
}: VideoLoadingSkeltonProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-[420px] h-[260px] flex items-center justify-center md:h-[380px] md:w-[590px] bg-gray-500 rounded-lg mb-1">
          <BaseIcon icon={PhPlayDuotone} size="lg" />
        </div>
      </div>
    );
  }
  return children;
}
