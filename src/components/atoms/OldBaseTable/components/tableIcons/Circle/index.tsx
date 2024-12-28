import { CircleBg } from '@ui/atoms/CircleBg';

type CircleProps = {
  id: string | boolean;
  className?: string;
};

export function Circle({ id, className }: CircleProps) {
  return (
    <CircleBg
      bgColor={id ? 'bg-teal-600' : 'bg-gray-400'}
      className={className}
    />
  );
}
