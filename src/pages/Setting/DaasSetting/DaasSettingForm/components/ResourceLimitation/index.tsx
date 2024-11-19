import { t } from 'i18next';

import { useLanguage } from '@context/settings/languageContext';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
import { ChromeSvg } from '@redesignUi/atoms/Svgs/ChromeSvg';
import { FirefoxSvg } from '@redesignUi/atoms/Svgs/FirefoxSvg';
import { TitleSection } from '@redesignUi/atoms/TitleSection';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { PropsType } from '@src/pages/Setting/type';
import { EPermissionDaas } from '@src/types/permissions';

import PhDownloadSimple from '@iconify-icons/ph/download-simple';

export function ResourceLimitation({ control, userPermissions }: PropsType) {
  const inputStyle = 'flex col-span-6 lg:col-span-4 h-16';
  const { lang } = useLanguage();
  const direction = lang === 'fa' ? 'rtl' : 'ltr';

  const hasChangePermission = checkPermission(
    userPermissions,
    EPermissionDaas.CHANGE
  );
  return (
    <>
      <div>
        <TitleSection label={t('setting.resourceLimitations')} />
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
        <div className="w-full grid grid-flow-col gap-2 whitespace-nowrap">
          <BaseCheckBoxController
            control={control}
            id=""
            name=""
            label={t('setting.chrome')}
          />
          <ChromeSvg />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mb-3">
        <div className={inputStyle}>
          <BaseInputNumberController
            id=""
            name=""
            control={control}
            label={t('setting.memory')}
            disabled={!hasChangePermission}
            placeholder="0"
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
        <div className={inputStyle}>
          <BaseInputNumberController
            id="cpu_file_size_gb_chrome"
            name="cpu_file_size_gb_chrome"
            control={control}
            label={t('setting.cpu')}
            disabled={!hasChangePermission}
            placeholder={t('setting.core')}
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
        <div className="w-full grid grid-flow-col gap-2 whitespace-nowrap">
          <BaseCheckBoxController
            control={control}
            id=""
            name=""
            label={t('setting.fireFox')}
          />
          <FirefoxSvg />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem]">
        <div className={inputStyle}>
          <BaseInputNumberController
            id=""
            name=""
            control={control}
            label={t('setting.memory')}
            disabled={!hasChangePermission}
            placeholder="0"
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
        <div className={inputStyle}>
          <BaseInputNumberController
            id=""
            name=""
            control={control}
            label={t('setting.cpu')}
            disabled={!hasChangePermission}
            placeholder={t('setting.core')}
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
        <div className="w-full grid grid-flow-col gap-2 whitespace-nowrap">
          <BaseCheckBoxController
            control={control}
            id=""
            name=""
            label={t('setting.ide')}
          />
          <FirefoxSvg />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem]">
        <div className={inputStyle}>
          <BaseInputNumberController
            id=""
            name=""
            control={control}
            label={t('setting.memory')}
            disabled={!hasChangePermission}
            placeholder="0"
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
        <div className={inputStyle}>
          <BaseInputNumberController
            id=""
            name=""
            control={control}
            label={t('setting.cpu')}
            disabled={!hasChangePermission}
            placeholder={t('setting.core')}
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
        <div className="w-full grid grid-flow-col gap-2 whitespace-nowrap">
          <BaseCheckBoxController
            control={control}
            id=""
            name=""
            label={t('setting.remina')}
          />
          <FirefoxSvg />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem]">
        <div className={inputStyle}>
          <BaseInputNumberController
            id=""
            name=""
            control={control}
            label={t('setting.memory')}
            disabled={!hasChangePermission}
            placeholder="0"
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
        <div className={inputStyle}>
          <BaseInputNumberController
            id=""
            name=""
            control={control}
            label={t('setting.cpu')}
            disabled={!hasChangePermission}
            placeholder={t('setting.core')}
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
      </div>
    </>
  );
}
