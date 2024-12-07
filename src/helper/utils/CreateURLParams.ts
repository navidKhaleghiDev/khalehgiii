/**
 * Converts an object of key-value pairs into a URL query string.
 *
 * @param {CreateEndPointParamsProps} props - The object containing query parameters.
 * @returns {string} The constructed query string starting with a "?".
 */

export function createURLParams(
  params: Record<string, string | number | boolean>
): string {
  const query = Object.keys(params)
    .map((key) => {
      const value = params[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  return `?${query}`;
}
