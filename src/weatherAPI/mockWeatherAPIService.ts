import {mockData} from "./mockData";
import {IWeatherAPIService} from "./interfaces";

export default class MockWeatherAPIService implements IWeatherAPIService {
  public async getData() {
    return mockData
  }
}
