import { Typography } from '@redesignUi/atoms';

export function TitleSection({ label }: { label: string }) {
  return (
    <Typography
      color="neutralDark"
      className="w-full my-4 col-span-12 text-2xl sm:text-3xl"
    >
      {label}
    </Typography>
  );
}
