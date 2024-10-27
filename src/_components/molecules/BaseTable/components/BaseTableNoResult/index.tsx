import { Typography } from '@redesignUi/atoms';

type PropsType = {
  isPage?: boolean;
  description?: string;
};
export function BaseTableNoResult({ isPage, description }: PropsType) {
  return (
    <tr
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <td>
        <img src="/not-found.jpg" alt="not found" width={150} height={150} />
        <Typography color="neutral">
          {description ?? `موردی یافت نشد`}
        </Typography>
      </td>
    </tr>
  );
}
