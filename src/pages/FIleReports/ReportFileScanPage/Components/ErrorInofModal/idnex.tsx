import { Typography } from '@redesignUi/atoms';
import { IScannedFile } from '@src/services/analyze/types';

type PropsType = {
  scannedFile?: IScannedFile;
};
export function DetailsContentModal({ scannedFile }: PropsType) {
  const fileScannerTypes = ['clamav', 'yara', 'antiviruses'];
  return (
    <div className="w-full flex flex-col p-4 gap-1 overflow-auto">
      {fileScannerTypes.map((item) => (
        <div key={item}>
          {scannedFile?.[`${item}_scan_result` as keyof IScannedFile] ? (
            <>
              <Typography
                variant="body3B"
                className="flex justify-end items-center"
              >
                {item}
              </Typography>
              <Typography variant="body5" color="neutral" className="text-end">
                {scannedFile?.[`${item}_scan_summary` as keyof IScannedFile]}
              </Typography>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
