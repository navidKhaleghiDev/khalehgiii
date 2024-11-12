import { Typography } from '@redesignUi/atoms';

type FormatModalCardProps = {
  label: string;
  formatList?: object;
};

export function FormatModalCard({ label, formatList }: FormatModalCardProps) {
  return (
    <div className="text-start w-60">
      <Typography variant="body5" color="neutral">
        {label}
      </Typography>
      <div className="flex flex-wrap gap-2 px-2.5 mt-4 py-2">
        {formatList
          ? Object.entries(formatList).map(([key, value]) => (
              <div
                className="bg-neutral-100 px-[10px] py-1 rounded-md text-neutral-800"
                key={`${key} ${value}`}
                dir="ltr"
              >
                <div className="flex flex-row-reverse text-sm items-center justify-center gap-[4px]">
                  <p className="text-sm text-gray-400">{value as string}MB</p>
                  <p>{key}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
