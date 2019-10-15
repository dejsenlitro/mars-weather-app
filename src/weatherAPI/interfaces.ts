import {IGetSolsReponse, ISol} from './models'

export interface IWeatherAPIService {
  getData(): Promise<any>
}
export interface IWeatherAPI {
  getSolWithMeasurements(sol: string): Promise<ISol>
  updateSolsData(): Promise<void>
  getSolsWithMeasurements(limit: number, page: number): Promise<IGetSolsReponse>
}
