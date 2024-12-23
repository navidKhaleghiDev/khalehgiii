import { Typography } from '@ui/atoms';

type FormatModalCardProps = {
  label: string;
  formatList?: object;
};

function convertMbToGb(mbValue: number): string {
  if (mbValue >= 1000) {
    const gbValue = mbValue / 1024;
    return `${gbValue.toFixed(2)} GB`;
  }
  return `${mbValue} MB`;
}

export function FormatModalCard({ label, formatList }: FormatModalCardProps) {
  return (
    <div className="text-start w-[255px]">
      <Typography variant="body5" color="neutral">
        {label}
      </Typography>
      <div className="flex flex-wrap content-stretch h-full gap-2 px-2.5 mt-4 py-2 border rounded-lg">
        {formatList
          ? Object.entries(formatList).map(([key, value]) => (
              <div
                className="bg-neutral-100 px-2.5 py-1 h-fit rounded-md text-neutral-800"
                key={`${key} ${value}`}
                dir="ltr"
              >
                <div className="flex flex-row-reverse text-sm items-center justify-center gap-[4px]">
                  <p className="text-sm text-gray-400">
                    {convertMbToGb(value)}
                  </p>
                  <p>{key}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
