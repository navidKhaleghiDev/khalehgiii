import { IconType } from '@src/types/global';
import { Typography, BaseIcon } from '@redesignUi/atoms';
import { CardButton } from '@ui/atoms/Card/CardButton';

type CardProps = {
  icon: IconType;
  title: string;
  onClick?: () => void;
  count?: number;
};

export function DashboardCard({ icon, title, onClick, count }: CardProps) {
  return (
    <CardButton
      border
      borderColor="neutral"
      className="w-full h-20 px-5 py-4 flex items-center gap-2.5 outline-none text-right overflow-hidden"
      color="white"
      onClick={onClick}
      disabled={!onClick}
      rounded="xxl"
      shadow="sm"
    >
      <div className="bg-gray-100 p-2 rounded dark:bg-gray-700">
        <BaseIcon
          icon={icon}
          color="neutral"
          size="md"
          className="dark:text-gray-400"
        />
      </div>
      <div className="w-full rtl:text-right ltr:text-left">
        <Typography color="neutralMiddle" variant="body3" className="leading-7">
          {title}
        </Typography>
        <Typography
          className="text-gray-900 dark:text-white font-semibold leading-7"
          variant="body2"
        >
          {count}
        </Typography>
      </div>
    </CardButton>
  );
}
