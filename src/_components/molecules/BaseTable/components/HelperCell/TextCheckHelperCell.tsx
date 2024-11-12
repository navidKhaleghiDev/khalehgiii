import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';

interface TextCheckProp {
  id?: any;
  firstCondition?: string;
  secondCondition?: string;
}

export function TextCheckHelperCell({
  id,
  firstCondition,
  secondCondition,
}: TextCheckProp) {
  const { t } = useTranslation();

  return (
    <Typography variant="body6" color="black" className="whitespace-nowrap">
      {!id ? t(firstCondition || '') : t(secondCondition || '')}
    </Typography>
  );
}
