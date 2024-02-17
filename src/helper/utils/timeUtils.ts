export const formatDuration = (duration?: number): string => {
  if (!duration) {
    return '';
  }
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
  return formattedDuration;
};
