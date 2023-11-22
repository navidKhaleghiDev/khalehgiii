import { IDaAs } from "@src/services/users/types";
import { DlpList } from "./DlpList";

type PropsType = {
  handleSetDlpValues: (name: keyof IDaAs, values: string[]) => void;
  dlpDownloadList: any;
  dlpUploadList: any;
};

export function DlpSettingsForm({
  handleSetDlpValues,
  dlpDownloadList,
  dlpUploadList,
}: PropsType) {
  return (
    <>
      <div className="px-2 col-span-3">
        <DlpList
          name="allowed_files_type_for_download"
          valueList={dlpDownloadList}
          onChange={handleSetDlpValues}
          label=":Trusted DLP Download"
        />
      </div>
      <div className="px-2 col-span-3">
        <DlpList
          name="allowed_files_type_for_upload"
          valueList={dlpUploadList}
          onChange={handleSetDlpValues}
          label=":Trusted DLP Upload"
        />
      </div>
    </>
  );
}
