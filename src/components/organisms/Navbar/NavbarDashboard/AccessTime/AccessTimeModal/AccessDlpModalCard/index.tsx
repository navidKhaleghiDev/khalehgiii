import { Typography } from '@ui/atoms/Typography/Typography';
import xIcon from '@iconify-icons/ph/x';
import checkBoldIcon from '@iconify-icons/ph/check-bold';
import { BaseIcon, Card } from '@ui/atoms';

type AccessDlpModalCardProps = {
  label: string;
  value?: string;
  isAccess?: boolean;
  contentDirection?: 'ltr' | 'rtl';
};

export function AccessDlpModalCard({
  label,
  value,
  isAccess,
  contentDirection = 'rtl',
}: AccessDlpModalCardProps) {
  return (
    <Card
      color="neutral"
      className="w-full flex justify-between items-center h-10 px-2"
    >
      <Typography size="h6" color="neutral">
        {label}
      </Typography>
      {isAccess !== undefined && (
        <BaseIcon
          icon={isAccess ? checkBoldIcon : xIcon}
          color={isAccess ? 'teal' : 'red'}
        />
      )}
      {value && (
        <div dir={contentDirection}>
          <Typography size="h6" color="neutral">
            {value}
          </Typography>
        </div>
      )}
    </Card>
  );
}
