import { useTranslation } from 'react-i18next';
import { Typography } from '@redesignUi/atoms';
import { IComponentTable } from '@ui/atoms/BaseTable/types';

interface ActionLockCellProps extends IComponentTable {
  firstCondition?: string;
  secondCondition?: string;
}

export function ActionLockCell({
  row,
  id,
  onClick,
  firstCondition,
  secondCondition,
}: ActionLockCellProps) {
  const { t } = useTranslation();

  const updatedUnlock = {
    ...row,
    is_lock: !id,
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => onClick && onClick('editLock', updatedUnlock)}
      >
        <Typography variant="body5" color="black">
          {id ? t(firstCondition || '') : t(secondCondition || '')}
        </Typography>
      </button>
    </div>
  );
}
