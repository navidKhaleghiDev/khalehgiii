import ToolTip from '../Tooltip';
import { BackButton, BackButtonProps } from './BackButton';

/**
 * PageBackButton component.
 *
 * @component
 * @param {boolean} props.withLabel - Add label to backButton.
 * @param {function} props.onClick - BackButton is clicked functionality.
 * @param {boolean} props.backToReferrer - navigate back to the ref that u provide.
 * @returns {JSX.Element}
 */

export function PageBackButton({
  withLabel,
  onClick,
  backToReferrer,
}: BackButtonProps): JSX.Element {
  return !withLabel ? (
    <ToolTip tooltip="صفحه قبل" position="right">
      <BackButton />
    </ToolTip>
  ) : (
    <BackButton
      withLabel={withLabel}
      onClick={onClick}
      backToReferrer={backToReferrer}
    />
  );
}
