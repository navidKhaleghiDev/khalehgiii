import { Card, Typography } from '@redesignUi/atoms';
import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';
import { useTranslation } from 'react-i18next';

type AccessDlpModalCardProps = {
  label: string;
  value?: string;
  isAccess?: boolean;
  contentDirection?: 'ltr' | 'rtl';
};

export function AccessDlpModalCard({
  label,
  value,
  isAccess,
  contentDirection = 'rtl',
}: AccessDlpModalCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      color="neutralLight"
      className="w-[607px] flex justify-between items-center border border-neutral-100 rounded-lg px-5 py-2.5"
    >
      <Typography variant="body5" color="black">
        {label}
      </Typography>
      {isAccess !== undefined && (
        <TagHelperCell
          title={isAccess ? t('table.allowed') : t('table.disallow')}
          color={isAccess ? 'teal' : 'red'}
        />
      )}
      {value && (
        <div dir={contentDirection}>
          <Typography variant="body5" color="black">
            {value}
          </Typography>
        </div>
      )}
    </Card>
  );
}
