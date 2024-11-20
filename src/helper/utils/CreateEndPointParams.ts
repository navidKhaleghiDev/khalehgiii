type CreateEndPointParamsProps = {
  endPoint: string;
  params: Record<string, string | number | boolean>;
};

/**
 * Constructs a URL with query parameters.
 *
 * This function takes an endpoint and a set of query parameters and returns
 * a complete URL string with the query parameters properly encoded.
 *
 * @param {createEndPointParamsProps} props - The properties for constructing the service call.
 * @param {string} props.endPoint - The base URL or endpoint of the service.
 * @param {Record<string, string | number | boolean>} props.params - An object where keys represent query parameter names and values represent their respective values.
 *
 * @returns {string} - A string representing the complete URL with encoded query parameters.
 *
 * @example
 * // Example usage:
 * const url = ServiceCall({
 *   endPoint: 'https://api.example.com/data',
 *   params: { search: 'test', limit: 10, debug: true }
 * });
 */

export function createEndPointParams({
  endPoint,
  params,
}: CreateEndPointParamsProps): string {
  const query = Object.keys(params)
    .map((key) => {
      const value = params[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  return `${endPoint}?${query}`;
}
