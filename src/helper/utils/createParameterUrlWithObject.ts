export function createURIWithObject(obj: object): string | null {
  const newArray: string[] = Object.entries(obj).reduce(
    (accumulator: string[], [key, value]: [string, string | undefined]) => {
      if (value) {
        accumulator.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
      return accumulator;
    },
    []
  );

  if (newArray.length) {
    return `?${newArray.join('&')}`;
  }
  return null;
}
