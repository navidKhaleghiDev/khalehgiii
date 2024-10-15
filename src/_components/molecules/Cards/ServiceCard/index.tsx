import { useTranslation } from 'react-i18next';

import { Card, Typography } from '@redesignUi/atoms';
import { DoughnutChart } from '@redesignUi/atoms/DoughnutChart';

import { ServiceCardProps } from './types';

export function ServiceCard(props: ServiceCardProps): JSX.Element {
  const { subValue, totalValue, title, date, className } = props;

  const { t } = useTranslation();

  return (
    <Card
      className={`lg:w-[15.93rem] w-40 h-[8.12rem] lg:py-6 lg:px-4  py-[0.68rem] px-5 flex items-center outline-none text-right overflow-hidden ${
        className ?? ''
      }`}
      shadow="base"
      rounded="xxl"
    >
      <div className="w-full lg:flex flex flex-col justify-center items-center lg:justify-between lg:items-center lg:flex-row">
        <div className=" w-full lg:flex lg:flex-col lg:items-end gap- flex flex-row items-baseline box-border">
          <Typography
            variant="body5"
            color="black"
            className="font-semibold rtl:text-right ltr:text-left whitespace-nowrap lg:w-full w-1/2"
          >
            {title}
          </Typography>
          <Typography
            variant="body6"
            color="neutralMiddle"
            className="rtl:text-right ltr:text-left lg:w-full w-1/2"
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
