import { Card, Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

type TOnlineAssistanceDetailProps = {
  data: number | [key: string] | [];
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
        className="h-10 flex justify-center items-center  font-semibold	p-2 rounded-xl"
        shadow="sm"
      >
        <Typography variant="body3" color="white" className="section-title ">
          {title}
        </Typography>
      </Card>
      <div className="  ">
        {Array.isArray(data) && data.length >= 1 ? (
          data.map((item) => (
            <Card
              color="white"
              border
              borderColor="neutral"
              shadow="sm"
              className="h-16 flex justify-start items-center	p-4 border-2 rounded-xl my-2"
              key={item}
            >
              <Typography variant="body2"> {Object.keys(item)}</Typography>
            </Card>
          ))
        ) : (
          <Typography className="p-6">{t('global.noData')}</Typography>
        )}
      </div>
    </div>
  );
}
