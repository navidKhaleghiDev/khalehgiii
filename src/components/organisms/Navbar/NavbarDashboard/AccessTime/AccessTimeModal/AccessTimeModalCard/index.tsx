import { Typography } from "@ui/atoms/Typography/Typography";
import { Card } from "@ui/atoms";

export function AccessTimeModalCard({ label, name, value }: any) {
  console.log({ value });

  return (
    <div className="w-full flex flex-col items-start mt-4">
      <Typography size="body3" color="teal">
        {label}
      </Typography>
      <Card
        color="neutral"
        className="w-full flex justify-center items-center h-16 px-2"
      >
        <div className="flex">
          <Typography size="h5" color="neutral">
            {name}،
          </Typography>
          <Typography size="h5" color="teal">
            {value}
          </Typography>
        </div>
      </Card>
    </div>
  );
}
