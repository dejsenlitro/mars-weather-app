import {IWeatherAPIService} from "./interfaces";
import {IGetSolsReponse} from "./models";

export default class WeatherApi {
  private weatherAPIService: IWeatherAPIService

  constructor(weatherAPIService: IWeatherAPIService) {
    this.weatherAPIService = weatherAPIService
  }

  public async getData(): Promise<any> {
    const data = await this.weatherAPIService.getData()

    return data
  }

  public async getAvailableSols(limit: number, page: number): Promise<IGetSolsReponse> {
    const data = await this.weatherAPIService.getData()
    const availableSols: string[] = data.sol_keys
    const sorted = availableSols
      .sort((a, b) => +b - +a)
      .slice((page - 1) * limit, page * limit)

    const response: IGetSolsReponse = {
      sols: sorted,
      totalItems: availableSols.length
    }

    return response
  }
}
