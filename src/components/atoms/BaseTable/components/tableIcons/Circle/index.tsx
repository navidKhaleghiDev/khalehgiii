import { CircleBg } from '@ui/atoms/CircleBg';

export function Circle({ id }: any) {
  return <CircleBg bgColor={id ? 'bg-teal-600' : 'bg-gray-400'} />;
}
