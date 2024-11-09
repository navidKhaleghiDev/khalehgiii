import { Typography } from '@redesignUi/atoms';

export function TitleSection({ label }: { label: string }) {
  return (
    <Typography
      color="black"
      variant="body4B"
      className="w-full col-span-12 dark:text-white"
    >
      {label}
    </Typography>
  );
}
