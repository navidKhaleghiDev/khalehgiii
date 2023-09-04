export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout((_error, data) => resolve(data), time);
  });
};

let id = 0;
export function generateUniqueId(): string {
  id += 1;
  return id.toString(36);
}
