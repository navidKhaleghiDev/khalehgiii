import { BaseIcon } from '@ui/atoms';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { Typography } from '@ui/atoms/Typography';

export function EditCardList() {
  return (
    <div className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2">
      <Typography variant="body2" color="neutral">{`Item `}</Typography>
      <Circle id className="mr-auto ml-2" />
      <BaseIcon icon="ph:trash" color="red" />
    </div>
  );
}
