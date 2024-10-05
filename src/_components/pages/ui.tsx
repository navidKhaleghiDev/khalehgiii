import { BasePasswordTest } from '@src/UI/BasePassWord';
import BaseOtpTest from '@src/UI/BaseOtpTest';
import { SliderTest } from '@ui/atoms/Slider/SliderTest';
import BaseTextAreaTest from '@src/UI/BaseTextAreaTest';
import { SearchInputTest } from '@src/UI/BaseSerch';
import { BaseDropdownTest } from '@src/UI/BaseDropdownTest';
import { BaseAvatarTest } from '@src/UI/BaseAvatarTest';

export function UiPage() {
  return (
    <div>
      <SliderTest />
      <BasePasswordTest />
      <BaseOtpTest />
      <BaseTextAreaTest />
      <SearchInputTest />
      <BaseDropdownTest />
      <BaseAvatarTest />
    </div>
  );
}

export default UiPage;
