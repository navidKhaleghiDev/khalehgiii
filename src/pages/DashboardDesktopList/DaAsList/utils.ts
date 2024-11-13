export function removeDuplicateExtensions(
  list: Record<string, number>
): Record<string, number> {
  const uniqueObject: Record<string, number> = {};
  Object.entries(list).forEach(([key, value]) => {
    const uniqueKey = `${key}:${value}`;
    if (!uniqueObject[uniqueKey]) {
      uniqueObject[uniqueKey] = value;
    }
  });

  const cleanList = Object.keys(uniqueObject).reduce((acc, uniqueKey) => {
    const [originalKey] = uniqueKey.split(':');
    acc[originalKey] = uniqueObject[uniqueKey];
    return acc;
  }, {} as Record<string, number>);

  return cleanList;
}
