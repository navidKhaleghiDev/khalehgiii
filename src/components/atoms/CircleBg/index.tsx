export function CircleBg({
  bgColor,
  className,
}: {
  bgColor: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 text-xs font-semibold  ${bgColor} rounded-full ${className}`}
    />
  );
}
