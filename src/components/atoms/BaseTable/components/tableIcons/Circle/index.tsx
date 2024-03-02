import { CircleBg } from '@ui/atoms/CircleBg';

type TCircleProps = {
  id: string | boolean;
};

export function Circle({ id }: TCircleProps) {
  return <CircleBg bgColor={id ? 'bg-teal-600' : 'bg-gray-400'} />;
}
