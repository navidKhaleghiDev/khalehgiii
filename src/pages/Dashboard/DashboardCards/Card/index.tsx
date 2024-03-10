import { IconType } from '@src/types/global';
import { Typography, BaseIcon } from '@ui/atoms';

type PropsType = {
  icon: IconType;
  title: string;
  description: string;
  onClick?: () => void;
};

export function Card({ icon, title, description, onClick }: PropsType) {
  return (
    <button
      type="button"
      className="w-full h-16 flex items-center bg-white dark:bg-slate-800 dark:hover:bg-cyan-900 hover:bg-gray-200 rounded-md shadow-xl disabled:hover:bg-white text-right"
      onClick={onClick}
      disabled={!onClick}
    >
      <BaseIcon icon={icon} className="m-4" color="teal" size="md" />
      <div>
        <Typography color="teal" size="h5">
          {title}
        </Typography>
        <Typography className="text-neutral-400" size="h6">
          {description}
        </Typography>
      </div>
    </button>
  );
}
