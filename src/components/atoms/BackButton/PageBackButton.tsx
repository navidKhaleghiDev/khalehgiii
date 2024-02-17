import ToolTip from '../Tooltip';
import { BackButton, BackButtonProps } from './BackButton';

export function PageBackButton({ withLabel, onClick }: BackButtonProps) {
  return (
    <div className="flex justify-end mb-4">
      {!withLabel ? (
        <ToolTip tooltip="صفحه قبل" position="right">
          <BackButton />
        </ToolTip>
      ) : (
        <BackButton withLabel={withLabel} onClick={onClick} />
      )}
    </div>
  );
}
