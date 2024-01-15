import { ETimeLimitDuration } from '@src/services/users/types';
import { t } from 'i18next';

export const TimeLimitDurationLabel = {
  [ETimeLimitDuration.DAILY]: t('table.daily'),
  [ETimeLimitDuration.WEEKLY]: t('table.weekly'),
  [ETimeLimitDuration.MONTHLY]: t('table.monthly'),
  [ETimeLimitDuration.PERMANENTLY]: t('table.permanently'),
  [ETimeLimitDuration.TEMPORARY]: t('table.temporary'),
};

export const TimeLimitDurationLabelDetails = {
  [ETimeLimitDuration.DAILY]: t('table.today'),
  [ETimeLimitDuration.WEEKLY]: t('table.thisWeek'),
  [ETimeLimitDuration.MONTHLY]: t('table.thisMonth'),
  [ETimeLimitDuration.PERMANENTLY]: t('table.permanently'),
  [ETimeLimitDuration.TEMPORARY]: t('table.temporary'),
};
