import { http_analyses } from "@src/services/http";
import { IAxiosResponse } from "@src/types/services";

import { E_ANALYZE_MIME_TYPE, E_ANALYZE_MIME_TYPE_DELETE } from "./endpoint";

export const API_ANALYZE_MIME_TYPE_DELETE = (id: number) =>
  http_analyses.delete<IAxiosResponse<any>>(E_ANALYZE_MIME_TYPE_DELETE(id));

export const API_ANALYZE_MIME_TYPE_CREATE = (body: any) =>
  http_analyses.post<IAxiosResponse<any>>(E_ANALYZE_MIME_TYPE, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
