import { Card, Typography } from "@ui/atoms";
import { IDaAs } from "@src/services/users/types";

type ProductCardProps = {
  daas: IDaAs;
  isHeader?: boolean;
};

export function DaAsCard({ daas, isHeader }: ProductCardProps) {
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && "bg-teal-500 text-white"} flex ${
          isHeader ? "h-10" : "h-14"
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/4 text-center break-words"
        >
          {daas.email}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-1/4 text-center break-words"
        >
          {daas.http_port}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-1/4 text-center break-words uppercase"
        >
          {daas.https_port}
        </Typography>
      </Card>
    </>
  );
}
