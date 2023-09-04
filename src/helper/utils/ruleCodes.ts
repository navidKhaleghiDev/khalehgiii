// pattern for convert rule_code to codeLine list
const getCodeListPattern = /(alert|drop|block|pass|reject)[\s\S]*?;\)/gm;

// pattern for split codeLine to SliceOrderCode
const sliceOrderPattern = /^(alert|drop|block|pass|reject)/;

export type SliceOrderCodeType = {
  order: string;
  code: string;
};

export function splitCodesAsList(code: string): string[] | null {
  return code.match(getCodeListPattern);
}

export function splitOrderCode(singleCode: string): SliceOrderCodeType {
  const splitted = singleCode.split(sliceOrderPattern);
  return { order: splitted[1], code: splitted[2] };
}

export function getCodeList(data?: string): SliceOrderCodeType[] {
  if (!data) {
    return [];
  }
  const list = data.match(getCodeListPattern);
  const newList: SliceOrderCodeType[] = [];
  list?.forEach((li) => {
    const { code, order } = splitOrderCode(li);
    if (code && order) {
      newList.push({ code, order });
    }
  });
  return newList;
}
