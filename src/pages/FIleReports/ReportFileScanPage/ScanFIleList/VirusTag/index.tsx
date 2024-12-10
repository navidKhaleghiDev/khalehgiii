import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';

export function VirusTag({ virusResult }: { virusResult: boolean }) {
  return (
    <TagHelperCell
      title={virusResult ? 'Virus' : 'N.V'}
      color={virusResult ? 'red' : 'teal'}
    />
  );
}
