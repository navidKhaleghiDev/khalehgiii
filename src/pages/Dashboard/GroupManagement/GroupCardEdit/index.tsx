import { BaseIcon, Typography } from '@ui/atoms';
import { CardButton } from '@ui/atoms/Card/CardButton';

type GroupCardEditProps = {
  name: string;
  image: string | undefined;
  onClickActions?: () => void;
};

export function GroupCardEdit({
  name,
  image,
  onClickActions,
}: GroupCardEditProps) {
  return (
    <CardButton
      shadow="lg"
      rounded="xl"
      className="w-36 p-3 flex justify-center items-center hover:bg-neutral-100 transition-colors duration-400 group"
      onClick={onClickActions}
    >
      <div className="flex flex-col items-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full flex justify-center items-center"
          />
        ) : (
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex justify-center items-center group-hover:bg-neutral-200 transition-colors duration-400">
            <BaseIcon icon="ph:users-three" size="xl" color="neutral" />
          </div>
        )}

        <Typography variant="body2" className="mt-3">
          {name}
        </Typography>
      </div>
    </CardButton>
  );
}
