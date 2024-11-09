import { IconType } from '@src/types/global';
import { BaseIcon } from '@ui/atoms';
import { baseIconStyles } from '@ui/atoms/BaseIcon/styles';
import { VariantProps } from 'class-variance-authority';

type ColorVariants = VariantProps<typeof baseIconStyles>['color'];

type Props = {
  icon: IconType;
  title: string;
  description: string;
  color?: ColorVariants;
};

export function OnlineAssistantCard({
  icon,
  title,
  description,
  color,
}: Props) {
  return (
    <div className="flex justify-center items-center h-10">
      <BaseIcon icon={icon} size="md" color={color} />
      <span className="mr-1 text-gray-500 ">{title}</span>
      <span className="mr-2">{description}</span>
    </div>
  );
}
