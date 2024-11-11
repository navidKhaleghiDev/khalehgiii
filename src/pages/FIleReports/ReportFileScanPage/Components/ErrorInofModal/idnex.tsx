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
              <Typography variant="body3B" className="text-start">
                {item}
              </Typography>
              <Typography
                variant="body5"
                color="neutral"
                className="text-start"
              >
                {scannedFile?.[`${item}_scan_summary` as keyof IScannedFile]}
              </Typography>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
