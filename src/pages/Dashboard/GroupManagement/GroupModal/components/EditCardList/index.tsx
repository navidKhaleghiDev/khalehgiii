import { IconButton } from '@ui/atoms/BaseButton';
// import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { Typography } from '@ui/atoms/Typography';

type TEditCardProps = {
  item: { id: string; email: string };
  onClick: (item: string) => void;
  permissions: boolean;
};

export function EditCardList({ item, onClick, permissions }: TEditCardProps) {
  return (
    <div className="bg-neutral-100 rounded-lg p-2 flex  justify-between items-center mx-2">
      <Typography variant="body2" color="neutral">
        {item.email}
      </Typography>
      {/* <Circle id className="mr-auto ml-2" /> */}
      {permissions ? (
        <IconButton
          icon="ph:trash"
          color="redNoBg"
          onClick={() => onClick(item.id)}
        />
      ) : null}
    </div>
  );
}
