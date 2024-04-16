import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { Nino } from "../types/nino";
import { GET_NINOS } from "./queries/ninoQueries";
import { GeneralCall } from "./generalServices";
import {
  DELETE_NINO,
  SAVE_NINO,
  UPDATE_NINO,
  UPDATE_SPONSOR,
} from "./mutations/ninoMutation";

var sourceGetNinos: CancelTokenSource,
  sourceSaveNinos: CancelTokenSource,
  sourceUpdateSponsor: CancelTokenSource,
  sourceUpdateNino: CancelTokenSource,
  sourceDeleteNino: CancelTokenSource;

export async function GetNinos(): Promise<AxiosResponse<Array<Nino>>> {
  sourceGetNinos = axios.CancelToken.source();

  const query = GET_NINOS();

  return GeneralCall(query, sourceGetNinos.token);
}

export async function SaveNino(
  name: string,
  identification: string,
  age: number,
  gender: number,
  sponsor?: string | null | undefined,
  gift?: number
) {
  sourceSaveNinos = axios.CancelToken.source();

  const query = SAVE_NINO(name, identification, age, gender, sponsor, gift);

  return GeneralCall(query, sourceSaveNinos.token);
}

export async function UpdateSponsor(ninoId: number, sponsor: string) {
  sourceUpdateSponsor = axios.CancelToken.source();

  const query = UPDATE_SPONSOR(ninoId, sponsor);

  return GeneralCall(query, sourceUpdateSponsor.token);
}

export async function UpdateNino(
  ninoId: number,
  name?: string,
  identification?: string,
  age?: number,
  gender?: number,
  sponsor?: string | null | undefined,
  gift?: number
) {
  sourceUpdateNino = axios.CancelToken.source();

  const query = UPDATE_NINO(
    ninoId,
    name,
    identification,
    age,
    gender,
    sponsor,
    gift
  );
  return GeneralCall(query, sourceUpdateNino.token);
}

export async function DeleteNino(ninoId: number) {
  sourceDeleteNino = axios.CancelToken.source();

  const query = DELETE_NINO(ninoId);

  return GeneralCall(query, sourceDeleteNino.token);
}

export function CancelNinoRequest(requestName: string) {
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
    case "UpdateNino":
      sourceUpdateNino?.cancel("Operation Canceled");
      break;
    case "DeleteNino":
      sourceDeleteNino?.cancel("Opration Canceled");
      break;
  }
}
