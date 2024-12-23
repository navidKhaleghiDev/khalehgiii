import { Typography } from '@ui/atoms';
import { CircleBg } from '@ui/atoms/CircleBg';
import { ScannedFile } from '@src/services/analyze/types';

type PropsType = {
  scannedFile?: ScannedFile;
};

export function DetailsContentModal({ scannedFile }: PropsType) {
  return (
    <div className="flex flex-col w-full text-left p-4 overflow-auto max-h-96">
      <Typography
        color="teal"
        variant="body2"
        className="flex justify-end items-center"
      >
        :CLAMAV Summary
        <CircleBg
          bgColor={
            scannedFile?.clamav_scan_result ? 'bg-red-600' : 'bg-green-400'
          }
          className="mr-2 ml-0"
        />
      </Typography>
      <Typography variant="body3" color="neutral">
        {scannedFile?.clamav_scan_summary}
      </Typography>

      <Typography
        color="teal"
        variant="body2"
        className="flex justify-end items-center"
      >
        :YARA Summary
        <CircleBg
          bgColor={
            scannedFile?.yara_scan_result ? 'bg-red-600' : 'bg-green-400'
          }
          className="mr-2 ml-0"
        />
      </Typography>
      <Typography variant="body3" color="neutral">
        {scannedFile?.yara_scan_summary}
      </Typography>

      <Typography
        color="teal"
        variant="body2"
        className="flex justify-end items-center"
      >
        :SANDBOX Summary
        <CircleBg
          bgColor={
            scannedFile?.antiviruses_scan_result ? 'bg-red-600' : 'bg-green-400'
          }
          className="mr-2 ml-0"
        />
      </Typography>
      <Typography variant="body3" color="neutral">
        {scannedFile?.antiviruses_scan_sandbox_summary}
      </Typography>

      <Typography
        color="teal"
        variant="body2"
        className="flex justify-end items-center"
      >
        :Other Engines Summary
        <CircleBg
          bgColor={
            scannedFile?.antiviruses_crowdsourced_ids_results
              ? 'bg-red-600'
              : 'bg-green-400'
          }
          className="mr-2 ml-0"
        />
      </Typography>
      <Typography variant="body3" color="neutral">
        {scannedFile?.antiviruses_scan_vendors_summary}
      </Typography>
    </div>
  );
}
