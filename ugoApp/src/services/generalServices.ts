import axios, { AxiosResponse } from "axios";
import { getWebSiteAPI } from "../configuration/config";
import { HEADERS } from "../constants/configConstants";

export async function GeneralCall(
  query: any,
  source: any
): Promise<AxiosResponse<any>> {
    var webSiteAPI = await getWebSiteAPI();

    return await axios
    .post(`${webSiteAPI}`, {query}, {headers: HEADERS, cancelToken: source  })
    .catch(function (thrown): any {
        if(axios.isCancel(thrown)){
            console.log("Request canceled", thrown.message);
        }
        return {};
    });
}
