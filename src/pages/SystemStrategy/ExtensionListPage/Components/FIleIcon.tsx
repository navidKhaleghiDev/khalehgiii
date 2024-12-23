import fileIcon from '@iconify-icons/ph/file';
import { BaseIcon, Typography } from '@ui/atoms';

export function FileICon({ fileType }: { fileType: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="border rounded-lg p-0.5">
        <BaseIcon icon={fileIcon} size="md" className="text-gray-400" />
      </div>
      <div dir="ltr">
        <Typography variant="body6" color="neutralDark">
          {fileType}
        </Typography>
      </div>
    </div>
  );
}
