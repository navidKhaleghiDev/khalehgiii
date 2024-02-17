import { PropsWithChildren } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface PropsType extends PropsWithChildren {
  isLoading: boolean;
}
export function LoadingWrapper({ isLoading, children }: PropsType) {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return children;
}
