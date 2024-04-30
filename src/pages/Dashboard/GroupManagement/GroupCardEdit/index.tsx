import { useTranslation } from 'react-i18next';
import { BaseIcon, Typography } from '@ui/atoms';
import { CardButton } from '@ui/atoms/Card/CardButton';

type GroupCardEditProps = {
  title: string;
  img?: string;
  onClickActions?: (groupId: string) => void | undefined;
  listCount?: number;
};

export function GroupCardEdit({
  title,
  img,
  listCount,
  onClickActions,
}: GroupCardEditProps) {
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClickActions) {
      onClickActions('3');
    }
  };

  return (
    <CardButton
      shadow="lg"
      rounded="xl"
      className="w-36 p-3 flex justify-center items-center hover:bg-neutral-100 transition-colors duration-400 group"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        {img ? (
          <img
            src={img}
            alt={title}
            className="w-20 h-20 rounded-full flex justify-center items-center"
          />
        ) : (
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex justify-center items-center group-hover:bg-neutral-200 transition-colors duration-400">
            <BaseIcon icon="ph:users-three" size="xl" color="neutral" />
          </div>
        )}

        <Typography variant="body2" className="mt-3">
          {title}
        </Typography>
        <Typography variant="body4">
          {`${listCount} ${t(`groupManagement.person`)}`}
        </Typography>
      </div>
    </CardButton>
  );
}
