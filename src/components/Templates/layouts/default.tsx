import { PropsWithChildren } from 'react';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return <main className="mainWrapper">{children}</main>;
}
