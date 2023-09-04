import { SliceOrderCodeType } from './ruleCodes';

export function getCountDifferenceOrder(
  oldCodeList: SliceOrderCodeType[],
  codeList: SliceOrderCodeType[]
) {
  return oldCodeList.filter(
    (oldCode) =>
      !codeList.some(
        (newCode) =>
          oldCode.code === newCode.code && oldCode.order === newCode.order
      )
  ).length;
}
