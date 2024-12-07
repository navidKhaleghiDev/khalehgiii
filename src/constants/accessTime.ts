import { TimeLimitDuration } from '@src/services/users/types';
import { t } from 'i18next';

export const TimeLimitDurationLabel = {
  [TimeLimitDuration.DAILY]: t('table.daily'),
  [TimeLimitDuration.WEEKLY]: t('table.weekly'),
  [TimeLimitDuration.MONTHLY]: t('table.monthly'),
  [TimeLimitDuration.PERMANENTLY]: t('table.permanently'),
  [TimeLimitDuration.TEMPORARY]: t('table.temporary'),
};

export const TimeLimitDurationLabelDetails = {
  [TimeLimitDuration.DAILY]: t('table.today'),
  [TimeLimitDuration.WEEKLY]: t('table.thisWeek'),
  [TimeLimitDuration.MONTHLY]: t('table.thisMonth'),
  [TimeLimitDuration.PERMANENTLY]: t('table.permanently'),
  [TimeLimitDuration.TEMPORARY]: t('table.temporary'),
};
