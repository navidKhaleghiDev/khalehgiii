import { IconButton } from '@ui/atoms/BaseButton';
// import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { Typography } from '@ui/atoms/Typography';

type TEditCardProps = {
  item: { id: string; email: string };
  onClick: (item: string) => void;
  permissions: boolean;
  disabled?: boolean;
};

export function EditCardList({
  item,
  onClick,
  permissions,
  disabled,
}: TEditCardProps) {
  return (
    <div className="bg-neutral-100 rounded-lg p-2 flex  justify-between items-center mx-2">
      <Typography variant="body2" color="neutral">
        {item.email}
      </Typography>
      {permissions && !disabled ? (
        <IconButton
          icon="ph:trash"
          color="redNoBg"
          onClick={() => onClick(item.id)}
        />
      ) : null}
    </div>
  );
}
