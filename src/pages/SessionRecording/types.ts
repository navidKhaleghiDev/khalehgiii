export interface ISessionRecordList {
  today: [key: TRecordData] | object;
  history: [key: TRecordData] | object;
}

export type TRecordData = {
  record_length: number;
  record_name: string;
};
