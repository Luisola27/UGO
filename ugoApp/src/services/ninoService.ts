import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { Nino } from "../types/nino";
import { GET_NINOS } from "./queries/ninoQueries";
import { GeneralCall } from "./generalServices";
import { SAVE_NINO, UPDATE_SPONSOR } from "./mutations/ninoMutation";

var sourceGetNinos: CancelTokenSource,
  sourceSaveNinos: CancelTokenSource,
  sourceUpdateSponsor: CancelTokenSource;

export async function GetNinos(): Promise<AxiosResponse<Array<Nino>>> {
  sourceGetNinos = axios.CancelToken.source();

  const query = GET_NINOS();

  return GeneralCall(query, sourceGetNinos.token);
}

export async function SaveNino(
  name: string,
  identification: string,
  age: number,
  gender: number
) {
  sourceSaveNinos = axios.CancelToken.source();

  const query = SAVE_NINO(name, identification, age, gender);

  return GeneralCall(query, sourceSaveNinos.token);
}

export async function UpdateSponsor(ninoId: number, sponsor: string){
    sourceUpdateSponsor = axios.CancelToken.source();

    const query = UPDATE_SPONSOR(ninoId, sponsor);

    return GeneralCall(query, sourceUpdateSponsor.token);
}

export function CancelProjectRequest(requestName: string) {
  switch (requestName) {
    case "GetNinos":
      sourceGetNinos?.cancel("Operation Canceled");
      break;
    case "SaveNino":
      sourceSaveNinos?.cancel("Operation Canceled");
      break;
    case "UpdateSponsor":
      sourceUpdateSponsor?.cancel("Operation Canceled");
      break;
  }
}
