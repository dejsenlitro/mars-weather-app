import {IWeatherAPI, IWeatherAPIService} from "./interfaces";
import {IGetSolsReponse} from "./models";
import {ICache} from "../cache/interfaces";

export default class WeatherApi implements IWeatherAPI {
  private weatherAPIService: IWeatherAPIService
  private cache: ICache

  constructor(weatherAPIService: IWeatherAPIService, cache: ICache) {
    this.weatherAPIService = weatherAPIService
    this.cache = cache
  }

  public async updateData() {
    const data = await this.weatherAPIService.getData()
    await this.cache.set(data)
  }

  public async getData(): Promise<any> {
    const cachedData = await this.cache.get()
    if (cachedData)
      return cachedData

    const data = await this.weatherAPIService.getData()
    await this.cache.set(data)

    return data
  }

  public async getAvailableSols(limit: number, page: number): Promise<IGetSolsReponse> {
    const data = await this.getData()
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
