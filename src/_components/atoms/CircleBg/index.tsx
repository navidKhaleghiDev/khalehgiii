export function CircleBg({ bgColor }: { bgColor: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold  ${bgColor} rounded-full`}
    />
  );
}
