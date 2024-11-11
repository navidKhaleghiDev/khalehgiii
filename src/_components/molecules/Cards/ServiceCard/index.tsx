import { useTranslation } from 'react-i18next';

import { Card, Typography } from '@redesignUi/atoms';
import { DoughnutChart } from '@redesignUi/atoms/DoughnutChart';

import { ServiceCardProps } from './types';

export function ServiceCard(props: ServiceCardProps): JSX.Element {
  const { subValue, totalValue, title, date, className } = props;

  const { t } = useTranslation();

  return (
    <Card
      className={`lg:w-[15.93rem] w-40 xl:h-[8.125rem] md:h-[8.875rem] h-32 lg:py-6 lg:px-4 py-5 px-5 flex items-center outline-none text-right overflow-hidden ${
        className ?? ''
      }`}
      shadow="base"
      rounded="xxl"
    >
      <div className="w-full lg:flex flex flex-col justify-center items-center lg:justify-between lg:items-center lg:flex-row">
        <div className=" w-full lg:flex lg:flex-col lg:items-end gap-2 flex flex-row items-baseline box-border">
          <Typography
            color="black"
            className="font-semibold rtl:text-right ltr:text-left whitespace-nowrap lg:w-full lg:text-base text-sm w-1/2"
          >
            {title}
          </Typography>
          <Typography
            color="neutralMiddle"
            className="rtl:text-right ltr:text-left lg:w-full lg:text-sm text-xs w-1/2"
          >
            {date}
          </Typography>
        </div>
        <div>
          <DoughnutChart
            subValue={subValue}
            totalValue={totalValue}
            color="teal"
            type="expireService"
          >
            <div className="flex flex-col justify-center h-7">
              <Typography variant="body5" className="font-semibold leading-3">
                {`${subValue}`}
              </Typography>
              <Typography variant="body6" className="leading-3">
                {t('dashboard.days')}
              </Typography>
            </div>
          </DoughnutChart>
        </div>
      </div>
    </Card>
  );
}
