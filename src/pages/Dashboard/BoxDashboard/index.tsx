import { Card, Typography, BaseIcon } from '@ui/atoms';

type PropsType = {
  icon: string;
  title: string;
  description: string;
};

export function BoxDashboard({ icon, title, description }: PropsType) {
  return (
    <Card color="white" shadow="xl" className="flex items-center">
      <>
        <BaseIcon icon={icon} className="m-4" color="teal" size="md" />
        <div>
          <Typography color="teal" size="h5">
            {title}
          </Typography>
          <Typography className="text-neutral-400" size="h6">
            {description}
          </Typography>
        </div>
      </>
    </Card>
  );
}
