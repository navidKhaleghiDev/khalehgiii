export const comparArrayListObject = <T>(
  listOne: T[],
  listTow: T[],
  compareFunction: (a: T, b: T) => boolean
) =>
  listOne.filter(
    (listOneValue) =>
      !listTow.some((listTowValue) =>
        compareFunction(listOneValue, listTowValue)
      )
  );
