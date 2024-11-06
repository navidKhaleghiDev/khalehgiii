import { UserAccessModalCardProps } from '../types';

export function UserAccessModalCard(
  props: UserAccessModalCardProps
): JSX.Element {
  const { children, className } = props;
  return (
    <div
      className={`flex flex-col w-full col-span-6 pt-4 mt-4 border-t border-t-gray-300 ${className}`}
    >
      {children}
    </div>
  );
}
