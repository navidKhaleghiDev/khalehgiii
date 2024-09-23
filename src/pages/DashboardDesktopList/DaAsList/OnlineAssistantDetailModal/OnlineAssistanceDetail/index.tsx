import { TNumberObjectArray } from '@src/types/global';
import { Card, Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

type TOnlineAssistanceDetailProps = {
  data: TNumberObjectArray;
  title: string;
};

export default function OnlineAssistanceDetail({
  data,
  title,
}: TOnlineAssistanceDetailProps) {
  const { t } = useTranslation();

  return (
    <div>
      <Card
        color="tealDark"
        className="h-8 flex justify-center items-center font-semibold	p-2 rounded-xl"
        shadow="sm"
      >
        <Typography variant="body3" color="white" className="section-title ">
          {title}
        </Typography>
      </Card>
      <div>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((item) => (
            <div key={Object.values(item).toString()}>
              <Card
                border
                borderColor="neutral"
                shadow="sm"
                className="h-19 flex justify-start items-center p-4 border-2 rounded-xl my-4"
              >
                <Typography variant="body2">{Object.keys(item)}</Typography>
              </Card>
            </div>
          ))}
        {(!Array.isArray(data) || data.length === 0) && (
          <Typography className="p-6">{t('global.noData')}</Typography>
        )}
      </div>
    </div>
  );
}
