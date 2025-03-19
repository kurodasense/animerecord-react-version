import { AxiosResponse } from "axios";
import diyRequest from "./request";
import { IAnimeDate, IAnimeRecord, IRequestType } from "./request/style";

export function getAnimeDate(): Promise<AxiosResponse<IRequestType<IAnimeDate[]>>> {
  return diyRequest.get({
    url: "/api/getAnimeDate"
  });
}

export function getAnimeRecordByDateId(
  date_id: string
): Promise<AxiosResponse<IRequestType<IAnimeRecord[]>>> {
  return diyRequest.get({
    url: "/api/getAnimeRecordByDateId",
    params: {
      date_id
    }
  });
}
