import { DrawerProvider } from '@context/drawer/drawerContext';
import { ListMenuContent } from './ListMenuContent';

export function ListMenu() {
  return (
    <div>
      <DrawerProvider>
        <ListMenuContent />
      </DrawerProvider>
    </div>
  );
}
