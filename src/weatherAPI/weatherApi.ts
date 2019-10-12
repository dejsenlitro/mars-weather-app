import {IWeatherAPIService} from "./interfaces";

export default class WeatherApi {
  private weatherAPIService: IWeatherAPIService

  constructor(weatherAPIService: IWeatherAPIService) {
    this.weatherAPIService = weatherAPIService
  }

  public async getData(): Promise<any> {
    const data = await this.weatherAPIService.getData()

    return data
  }

  public async getAvailableSols(): Promise<string[]> {
    const data = await this.weatherAPIService.getData()
    const availableSols: string[] = data.sol_keys
    const sorted = availableSols.sort((a, b) => +b - +a)

    return sorted
  }
}
