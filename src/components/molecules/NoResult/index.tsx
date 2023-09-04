import { Typography } from '@ui/atoms';

type PropsType = {
  isPage?: boolean;
  description?: string;
};
export function NoResult({ isPage, description }: PropsType) {
  return (
    <div
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <img src="/not-found.jpg" alt="not found" />
      <Typography color="neutral">{description ?? `موردی یافت نشد`}</Typography>
    </div>
  );
}
