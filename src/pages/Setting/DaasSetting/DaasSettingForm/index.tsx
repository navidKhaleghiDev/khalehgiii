// import { useEffect, useState } from 'react';
// import { Control, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// import { regexPattern } from '@ui/atoms/Inputs';
// import { IAddConfig } from '@src/services/config/types';
// import {
//   API_ADD_CONFIG,
//   API_ADD_UPDATE,
//   API_CONFIG_LIST,
// } from '@src/services/config';
// import { Divider } from '@ui/atoms/Divider';
// import {
//   checkPermission,
//   useUserPermission,
// } from '@src/helper/hooks/usePermission';
// import {
//   EPermissionDaas,
//   EPermissionKeycloak,
//   PermissionsCodeName,
// } from '@src/types/permissions';
// import { Typography } from '@redesignUi/atoms';
// import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
// import { useLanguage } from '@context/settings/languageContext';
// import { LoadingSpinner } from '@redesignUi/molecules/Loading';

// import { TitleSection } from '@redesignUi/atoms/TitleSection';
// import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
// import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';

// type PropsType = {
//   control: Control<any>;
//   isRecording?: boolean;
//   isMetaConfig?: boolean;
//   userPermissions: PermissionsCodeName[];
// };
// // export enum ETimeLimitDuration {
// //   DAILY = 'DAILY',
// //   MONTHLY = 'MONTHLY',
// //   WEEKLY = 'WEEKLY',
// //   PERMANENTLY = 'PERMANENTLY',
// //   TEMPORARY = 'TEMPORARY',
// // }

// export function DaasSettingForm({
//   control,
//   isRecording,
//   userPermissions,
//   isMetaConfig,
// }: PropsType) {
//   const { t } = useTranslation();
//   const hasChangePermission = checkPermission(
//     userPermissions,
//     EPermissionDaas.CHANGE
//   );

//   return (
//     <div className="mx-5 col-span-6">
//       <div className="mb-[6.25rem]">
//         <TitleSection label="Daas" />
//       </div>
//       <div className="w-full h-full flex flex-col justify-between">
//         <Typography className="mb-1" color="black" variant="body4B">
//           {t('table.downloadAndUploadPrivilege')}
//         </Typography>

//         <div className="grid mt-4">
//           <div className="flex col-span-6 lg:col-span-4 gap-[9.18rem]">
//             <BaseCheckBoxController
//               control={control}
//               id="can_download_file"
//               name="can_download_file"
//               label={t('table.downloadPrivilege')}
//             />
//             <BaseCheckBoxController
//               control={control}
//               id="can_upload_file"
//               name="can_upload_file"
//               label={t('table.uploadPrivilege')}
//             />
//           </div>
//         </div>

//         <Divider />

//         <TitleSection label={t('table.timeLimitDuration')} />

//         <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-4">
//           <div className="col-span-6 lg:col-span-4">
//             <BaseRadioButtonController
//               control={control}
//               id="time_limit_duration"
//               name="time_limit_duration"
//               value="DAILY"
//               label="روزانه "
//             />
//             <BaseRadioButtonController
//               control={control}
//               id="time_limit_duration"
//               name="time_limit_duration"
//               value="WEEKLY"
//               label="هفتگی "
//             />
//             <BaseRadioButtonController
//               control={control}
//               id="time_limit_duration"
//               name="time_limit_duration"
//               value="ماهانه  "
//             />

//             <BaseRadioButtonController
//               control={control}
//               id="time_limit_duration"
//               name="time_limit_duration"
//               value="PERMANENTLY"
//               label="دایمی"
//             />
//             <BaseRadioButtonController
//               control={control}
//               id="time_limit_duration"
//               name="time_limit_duration"
//               value="TEMPORARY"
//               label="موقت "
//             />
//           </div>
//           <div className="col-span-6 lg:col-span-4">
//             <BaseInputController
//               id="log_server_ip"
//               name="log_server_ip"
//               rules={{
//                 required: regexPattern.required,
//                 pattern: regexPattern.ip,
//               }}
//               control={control}
//               label="Log Server IP"
//               placeholder="192.168.1.1"
//               fullWidth
//             />
//           </div>
//         </div>
//         <Divider />

//         <TitleSection label="Manager" />

//         <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-5">
//           <div className="col-span-6 lg:col-span-4">
//             <BaseInputController
//               id="daas_provider_baseurl"
//               name="daas_provider_baseurl"
//               rules={{
//                 required: regexPattern.required,
//                 pattern: regexPattern.url,
//               }}
//               control={control}
//               label="Daas provider baseURL"
//               placeholder="sep.npd-co.com"
//               fullWidth
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
