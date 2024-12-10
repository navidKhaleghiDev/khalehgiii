export interface SessionRecordListParams {
  today: [key: RecordDataParams] | object;
  history: [key: RecordDataParams] | object;
}

export type RecordDataParams = {
  record_length: number;
  record_name: string;
};
