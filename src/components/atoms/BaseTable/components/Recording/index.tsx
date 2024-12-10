import { IconButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';
import PhPlayCircleLight from '@iconify-icons/ph/play-circle-light';
import PhRecordFill from '@iconify-icons/ph/record-fill';
import { RowCellsComponent } from '../../types';

export function Recording({ row, onClick }: RowCellsComponent) {
  const { t } = useTranslation();
  const isRecording = row?.status === 'recording';
  const tooltipTitle = isRecording ? 'table.isRecording' : 'table.play';

  return (
    <div className="absolute flex">
      <IconButton
        tooltip={t(tooltipTitle)}
        tooltipPosition="top"
        icon={isRecording ? PhRecordFill : PhPlayCircleLight}
        color={isRecording ? 'redNoBg' : 'tealNoBg'}
        size="xxl"
        disabled={isRecording}
        onClick={
          !isRecording && onClick ? () => onClick('more', row) : undefined
        }
      />
    </div>
  );
}
