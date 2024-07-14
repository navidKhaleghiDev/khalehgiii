import { IconButton } from '@ui/atoms/BaseButton';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { Typography } from '@ui/atoms/Typography';

export function EditCardList({ item, onClick }) {
  return (
    <div className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2">
      <Typography variant="body2" color="neutral">
        {item.name}
      </Typography>
      <Circle id className="mr-auto ml-2" />
      <IconButton
        icon="ph:trash"
        color="redNoBg"
        onClick={() => onClick(item.id)}
      />
    </div>
  );
}
