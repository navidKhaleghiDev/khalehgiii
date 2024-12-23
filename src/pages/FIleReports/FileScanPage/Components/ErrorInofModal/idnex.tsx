import { Typography } from '@ui/atoms';
import { ScannedFile } from '@src/services/analyze/types';

type PropsType = {
  scannedFile?: ScannedFile;
};
export function DetailsContentModal({ scannedFile }: PropsType) {
  const fileScannerTypes = ['clamav', 'yara', 'antiviruses'];
  return (
    <div className="w-full flex flex-col p-4 gap-1 overflow-auto">
      {fileScannerTypes.map((item) => (
        <div key={item}>
          {scannedFile?.[`${item}_scan_result` as keyof ScannedFile] ? (
            <>
              <Typography variant="body3B" className="text-start">
                {item}
              </Typography>
              <Typography
                variant="body5"
                color="neutral"
                className="text-start"
              >
                {scannedFile?.[`${item}_scan_summary` as keyof ScannedFile]}
              </Typography>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
