export function SearchBarComponent({ componentProps }) {
  const Component = componentProps.component;

  if (!Component) {
    return null;
  }

  return <Component onClick={Component.onClick} label={Component.label} />;
}
