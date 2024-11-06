// import { BaseIcon, Typography } from '@redesignUi/atoms';
// import PhFile from '@iconify-icons/ph/file';
// import PhFileJpg from '@iconify-icons/ph/file-jpg';
// import PhFilePng from '@iconify-icons/ph/file-png';
// import PhFilePdf from '@iconify-icons/ph/file-pdf';
// import PhFileZip from '@iconify-icons/ph/file-zip';
// import PhFileDoc from '@iconify-icons/ph/file-doc';
// import PhFilePpt from '@iconify-icons/ph/file-ppt';
// import PhFileTsx from '@iconify-icons/ph/file-tsx';
// import PhFileVue from '@iconify-icons/ph/file-vue';
// import PhFileXls from '@iconify-icons/ph/file-xls';
// import PhFileSvg from '@iconify-icons/ph/file-svg';
// import PhFileSql from '@iconify-icons/ph/file-sql';
// import PhFileHtml from '@iconify-icons/ph/file-html';
// import PhFileCsv from '@iconify-icons/ph/file-csv';
// import PhFileJsx from '@iconify-icons/ph/file-jsx';
// import PhFileCss from '@iconify-icons/ph/file-css';

// const iconMapping = {
//   file: PhFile,
//   jpg: PhFileJpg,
//   png: PhFilePng,
//   pdf: PhFilePdf,
//   zip: PhFileZip,
//   doc: PhFileDoc,
//   ppt: PhFilePpt,
//   tsx: PhFileTsx,
//   vue: PhFileVue,
//   xls: PhFileXls,
//   svg: PhFileSvg,
//   sql: PhFileSql,
//   html: PhFileHtml,
//   csv: PhFileCsv,
//   jsx: PhFileJsx,
//   css: PhFileCss,
// };
// export function IconFile({ fileType }: { fileType: string }) {
//   const normalizedIcon = fileType.replace(/^\./, '').toLowerCase();
//   const SelectedIcon =
//     iconMapping[normalizedIcon as keyof typeof iconMapping] || PhFile;

//   return (
//     <div className="flex items-center gap-2">
//       <div className=" justify-center items-center flex w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-400">
//         <BaseIcon icon={SelectedIcon} size="md" className="text-gray-400" />
//       </div>
//       <Typography variant="body6" color="black">
//         {fileType}
//       </Typography>
//     </div>
//   );
// }
