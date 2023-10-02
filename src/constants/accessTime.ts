import { ETimeLimitDuration } from "@src/services/users/types";

export const TimeLimitDurationLabel = {
  [ETimeLimitDuration.DAILY]: "روزانه",
  [ETimeLimitDuration.WEEKLY]: "هفتگی",
  [ETimeLimitDuration.MONTHLY]: "ماهانه",
  [ETimeLimitDuration.PERMANENTLY]: "دايمی",
};

export const TimeLimitDurationLabelDetails = {
  [ETimeLimitDuration.DAILY]: "امروز",
  [ETimeLimitDuration.WEEKLY]: "این هفته",
  [ETimeLimitDuration.MONTHLY]: "این ماه",
  [ETimeLimitDuration.PERMANENTLY]: "دايمی",
};
