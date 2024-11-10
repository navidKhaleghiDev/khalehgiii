import { Typography } from '@redesignUi/atoms';

export function TitleSection({ label }: { label: string }) {
  return (
    <Typography
      color="neutralDark"
      className="w-full col-span-12 text-xl sm:text-lg font-semibold"
    >
      {label}
    </Typography>
  );
}
