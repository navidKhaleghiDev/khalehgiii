import { Card, Typography } from '@ui/atoms';

type AccessTimeModalCardProps = {
  label: string;
  value?: string;
};

export function AccessTimeModalCard({
  label,
  value,
}: AccessTimeModalCardProps) {
  return (
    <div className="text-start">
      <Typography variant="body5" color="neutral">
        {label}
      </Typography>
      <Card className="w-40 p-[0.625rem] mt-1 !bg-neutral-100">
        <div className="flex">
          <Typography variant="body5" color="teal">
            {value}
          </Typography>
        </div>
      </Card>
    </div>
  );
}