import { Typography, BaseIcon } from "@ui/atoms";

type PropsType = {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
};

export function Card({ icon, title, description, onClick }: PropsType) {
  return (
    <button
      className="w-full flex items-center bg-white hover:bg-gray-200 rounded-md shadow-xl disabled:hover:bg-white"
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
