import { BaseIcon } from '@ui/atoms';

type Props = {
  /**
   * Allows the parent component to modify the state when the
   * menu button is clicked.
   */
  onMenuButtonClick(): void;
};

function Navbar({ onMenuButtonClick }: Props) {
  return (
    <nav className="bg-white text-zinc-500 flex items-center w-screen md:w-full sticky z-10 px-4 shadow-sm h-[73px] top-0">
      <div className="font-bold text-lg">Admin Panel</div>
      <div className="flex-grow" />
      <button className="md:hidden" onClick={onMenuButtonClick} type="button">
        <BaseIcon icon="fa:home" className="h-6 w-6" />
      </button>
    </nav>
  );
}
export default Navbar;
