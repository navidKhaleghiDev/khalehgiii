import { IconType } from '@src/types/global';
import { BaseIcon } from '@ui/atoms';

type Props = {
  icon: IconType;
  title: string;
  description: string;
};

export function OnlineAssistantCard({ icon, title, description }: Props) {
  return (
    <div className="flex justify-center items-center h-10">
      <BaseIcon icon={icon} size="md" color="neutral" />
      <span className="mr-1 text-neutral-500 ">{title}</span>
      <span className="mr-2">{description}</span>
    </div>
  );
}
