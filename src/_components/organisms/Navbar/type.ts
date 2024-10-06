export interface NavbarDashboardProps {
  dark: boolean;
}
export interface IconToggleSwitchProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id: string;
  name: string;
}
