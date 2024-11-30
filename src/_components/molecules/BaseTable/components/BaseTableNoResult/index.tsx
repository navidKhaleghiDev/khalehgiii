import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { NoResultTableSvg } from '@redesignUi/atoms/Svgs/NoResultTableSvg';

type PropsType = {
  isPage?: boolean;
  description?: string;
};
export function BaseTableNoResult({ isPage, description }: PropsType) {
  const { t } = useTranslation();
  return (
    <tr
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <td>
        <NoResultTableSvg height={200} width={200} />
        <Typography variant="body4B" color="neutral" className="text-center">
          {description ?? t('global.notFoundData')}
        </Typography>
      </td>
    </tr>
  );
}
