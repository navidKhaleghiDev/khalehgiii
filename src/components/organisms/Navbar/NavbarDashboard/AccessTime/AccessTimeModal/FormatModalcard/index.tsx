import { Typography } from '@redesignUi/atoms';

type FormatModalCardProps = {
  label: string;
  formatList?: string[];
};

export function FormatModalCard({ label, formatList }: FormatModalCardProps) {
  console.log(formatList);

  return (
    <div className="text-start">
      <Typography variant="body5" color="neutral">
        {label}
      </Typography>
    </div>
  );
}
