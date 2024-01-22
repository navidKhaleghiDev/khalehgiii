import { IconButton } from '@ui/atoms/BaseButton';
import ToolTip from '@ui/atoms/Tooltip';
import plusIcon from '@iconify-icons/ph/plus';

export function ButtonAdd({ label, onClick }: any) {
  return (
    <ToolTip tooltip={label} position="right">
      <IconButton icon={plusIcon} color="teal" size="lg" onClick={onClick} />
    </ToolTip>
  );
}
