import { Avatar } from '@redesignUi/atoms';
import { IconType } from '@src/types/global';

type Props = {
  icon: IconType;
  description: string;
};

export function OnlineAssistantCard({ icon, description }: Props) {
  return (
    <div className="flex justify-center items-center h-10">
      <Avatar icon={icon} size="sm" />
      <span className="mr-2 text-gray-600 text-xs ">{description}</span>
    </div>
  );
}
