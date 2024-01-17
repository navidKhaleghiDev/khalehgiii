import { Card, Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';
import { HeaderItem } from './BaseTableTypes';

interface PropsType {
  header: HeaderItem[];
}

export function BaseTabelHeader({ header }: PropsType) {
  const { t } = useTranslation();

  return (
    <Card
      color="neutral"
      className="flex items-center px-2 my-2  bg-teal-500 text-white h-10 w-full"
    >
      {header.map((head: HeaderItem) => (
        <div
          key={head.id}
          className={`${head.style} flex justify-center items-center font-normal`}
          dir={!head.dir ? 'ltr' : head.dir}
        >
          <Typography size="body4" type="div" className="uppercase ellipsis">
            {t(head.label)}
          </Typography>
        </div>
      ))}
    </Card>
  );
}
