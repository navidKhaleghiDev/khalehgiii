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
	[ETimeLimitDuration.DAILY]: t('tabel.today'),
	[ETimeLimitDuration.WEEKLY]: t('tabel.thisWeek'),
	[ETimeLimitDuration.MONTHLY]: t('thisMonth'),
	[ETimeLimitDuration.PERMANENTLY]: t('table.permanently'),
	[ETimeLimitDuration.TEMPORARY]: t('table.temporary'),
};
