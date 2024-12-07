import { useTranslation } from 'react-i18next';
import { BaseIcon, Typography } from '@ui/atoms';
import { CardButton } from '@ui/atoms/Card/CardButton';

type GroupCardAddProps = {
  onClickActions: () => void;
};

export function GroupCardAdd({ onClickActions }: GroupCardAddProps) {
  const { t } = useTranslation();

  return (
    <CardButton
      shadow="lg"
      rounded="xl"
      className="w-36 p-3 flex justify-center items-center hover:bg-gray-100 transition-colors duration-400 group"
      onClick={onClickActions}
    >
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex justify-center items-center group-hover:bg-gray-200 transition-colors duration-400">
          <BaseIcon icon="ph:plus" size="lg" color="neutral" />
        </div>
        <Typography variant="body4" className="mt-2">
          {`${t(`groupManagement.createGroup`)}`}
        </Typography>
      </div>
    </CardButton>
  );
}
