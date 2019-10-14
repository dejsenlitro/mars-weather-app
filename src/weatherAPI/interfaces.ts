import {IGetSolsReponse, ISol} from "./models";

export interface IWeatherAPIService {
  getData(): Promise<any>
}
export interface IWeatherAPI {
  getSolData(sol: string): Promise<ISol>
  updateData(): Promise<void>
  getData(): Promise<any>
  getAvailableSols(limit: number, page: number): Promise<IGetSolsReponse>
}
