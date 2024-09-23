import { CircleBg } from '@ui/atoms/CircleBg';

type TCircleProps = {
  id: string | boolean;
  className?: string;
};

export function Circle({ id, className }: TCircleProps) {
  return (
    <CircleBg
      bgColor={id ? 'bg-teal-600' : 'bg-gray-400'}
      className={className}
    />
  );
}
