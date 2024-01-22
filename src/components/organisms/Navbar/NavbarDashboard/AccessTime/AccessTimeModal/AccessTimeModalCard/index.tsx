import { Typography } from '@ui/atoms/Typography/Typography';
import { Card } from '@ui/atoms';

type AccessTimeModalCardProps = {
  label: string;
  name?: string;
  value?: string;
  contentDirection?: 'ltr' | 'rtl';
};

export function AccessTimeModalCard({
  label,
  name,
  value,
  contentDirection = 'rtl',
}: AccessTimeModalCardProps) {
  return (
    <div className="w-full flex flex-col items-start mt-4">
      <Typography size="body3" color="neutral">
        {label}
      </Typography>
      <Card
        color="neutral"
        className="w-full flex justify-center items-center h-16 px-2"
      >
        <div className="flex" dir={contentDirection}>
          {name && (
            <Typography size="h5" color="neutral">
              {name}،
            </Typography>
          )}
          <Typography size="h5" color="teal">
            {value}
          </Typography>
        </div>
      </Card>
    </div>
  );
}
