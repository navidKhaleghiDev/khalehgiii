export interface BaseDropdownMenuProps {
  buttonContent: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  onToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onClose: () => void;
}
