import { useTranslation } from 'react-i18next';
import PhPlayCircleLight from '@iconify-icons/ph/play-circle-light';
import PhRecordFill from '@iconify-icons/ph/record-fill';
import { IconButton } from '@ui/atoms/BaseButton';
import { ToolTip } from '@ui/atoms/Tooltip';
import { RowCellsComponent } from '@ui/molecules/BaseTable/types';

export function Recording({ row, onClick }: RowCellsComponent) {
  const { t } = useTranslation();
  const isRecording = row?.status === 'recording';
  const tooltipTitle = isRecording ? 'table.isRecording' : 'table.play';
  return (
    <div className="absolute flex">
      <ToolTip tooltip={t(tooltipTitle)} position="top">
        <IconButton
          icon={isRecording ? PhRecordFill : PhPlayCircleLight}
          color={isRecording ? 'redNoBg' : 'neutralNoBg'}
          size="lg"
          disabled={isRecording}
          onClick={
            !isRecording && onClick ? () => onClick('more', row) : undefined
          }
        />
      </ToolTip>
    </div>
  );
}
