import axios from 'axios'
import {IWeatherAPIService} from "./interfaces";

export default class WeatherAPIService implements IWeatherAPIService {
  public async getData() {
    const response = await axios.get('https://api.nasa.gov/insight_weather/?api_key=nUcefdIk8JnGmkRloaiwIEqu5PUdYa2I4pxlAGfA&feedtype=json&ver=1.0')

    return response.data
  }
}
