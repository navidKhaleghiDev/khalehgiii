import { Typography } from '@redesignUi/atoms';
import { ToggleButton } from '@redesignUi/atoms/ToggleButton/ToggleButton';
import { useTranslation } from 'react-i18next';

export function HeaderProgressChartSection({
  timeFrame,
  setTimeFrame,
}: {
  timeFrame: string;
  setTimeFrame: (value: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col sm:flex-row pb-2.5 sm:pb-[3.125rem]">
      <div className="w-1/2">
        <Typography color="black" variant="body4B">
          {t('dashboard.scanChart')}
        </Typography>
      </div>
      <div className="w-1/2 flex sm:justify-end gap-2.5">
        {/* disable the domain cause the functionality dose not work */}

        {/* <div className="col-span-6 justify-self-end">
            <BaseButton
              label={t('global.domain')}
              endIcon={caretLeft}
              size="sm"
              type="neutral"
              className="sm:flex hidden"
              disabled // This button is disabled until the backend provides data for the domain
            />
            <IconButton
              icon={GlobeSimple}
              color="neutral"
              size="sm"
              className="sm:hidden flex"
            />
          </div> */}
        {/* disable the option cause the functionality does not work */}
        <div className="max-w-max">
          <ToggleButton
            buttonOptions={[
              {
                id: 1,
                label: t('table.monthly'),
                value: 'monthly',
                active: timeFrame === 'monthly',
              },
              {
                id: 2,
                label: t('table.weekly'),
                value: 'weekly',
                active: timeFrame === 'weekly',
              },
              {
                id: 3,
                label: t('table.daily'),
                value: 'daily',
                active: timeFrame === 'daily',
              },
            ]}
            onChange={(data) => setTimeFrame(data?.value)}
            size="responsive"
          />
        </div>
      </div>
    </div>
  );
}
