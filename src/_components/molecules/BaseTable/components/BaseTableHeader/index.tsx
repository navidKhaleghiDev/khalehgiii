import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { IconButton } from '@ui/atoms/BaseButton';
import icon from '@iconify-icons/ph/sort-descending-thin';

export function BaseTableHeader({ header, onClick }) {
  const { t } = useTranslation();

  return (
    <thead className="w-full flex items-center rounded-lg h-8 bg-white mb-3 ">
      {header.map((head) => {
        return (
          <tr key={head.label} className={`px-5 ${head.class} `}>
            <th className="flex">
              <Typography variant="body5" color="neutral" type="div">
                {t(head.label)}
              </Typography>
              {head.type === 'sort' && <IconButton icon={icon} />}
            </th>
          </tr>
        );
      })}
    </thead>
  );
}
