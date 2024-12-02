import { t } from 'i18next';

import { useLanguage } from '@context/settings/languageContext';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
import { ChromeSvg } from '@redesignUi/atoms/Svgs/ChromeSvg';
import { FirefoxSvg } from '@redesignUi/atoms/Svgs/FirefoxSvg';
import { TitleSection } from '@redesignUi/atoms/TitleSection';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { EPermissionDaas } from '@src/types/permissions';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';
import { VsSvg } from '@redesignUi/atoms/Svgs/VsSvg';
import { RemminaSvg } from '@redesignUi/atoms/Svgs/RemminaSvg';
import { PropsType } from '@src/pages/Setting/type';

const inputStyle = 'flex col-span-6 lg:col-span-4 h-16';
const checkBoxStyle = 'w-full grid grid-flow-col gap-2 whitespace-nowrap';

export function ResourceLimitation({ userPermissions, control }: PropsType) {
  const { dir } = useLanguage();

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
        <div className={`${checkBoxStyle}`}>
          <BaseCheckBoxController
            control={control}
            id="chromLimitaion"
            name="chromLimitaion"
            label={t('setting.chrome')}
          />
          <ChromeSvg />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mb-3">
        <div className={inputStyle}>
          <BaseInputNumberController
            id="fireFoxLimation"
            name="fireFoxLimation"
            control={control}
            label={t('setting.memory')}
            disabled={!hasChangePermission}
            icon={PhDownloadSimple}
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
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
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
        <div className={`${checkBoxStyle}`}>
          <BaseCheckBoxController
            control={control}
            id="FireFoxLimattion"
            name="FireFoxLimattion"
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
            icon={PhDownloadSimple}
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
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
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
        <div className={`${checkBoxStyle}`}>
          <BaseCheckBoxController
            control={control}
            id="IDELimatation"
            name="IDELimatation"
            label={t('setting.ide')}
          />
          <VsSvg />
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
            icon={PhDownloadSimple}
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
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
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
            max={500}
            // rules={{
            //   required: regexPattern.required,
            // }}
            fullWidth
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
        <div className={`${checkBoxStyle}`}>
          <BaseCheckBoxController
            control={control}
            id="remotAccesLimtion"
            name="remotAccesLimtion"
            label={t('setting.remina')}
          />
          <RemminaSvg />
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
            icon={PhDownloadSimple}
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
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
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
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
