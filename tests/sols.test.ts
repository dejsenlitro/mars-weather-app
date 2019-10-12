import {expect} from 'chai'
import WeatherApi from '../src/weatherAPI/weatherApi';
import MockWeatherAPIService from '../src/weatherAPI/mockWeatherAPIService';

describe('Available Sols', () => {
  it('Get available sols', async () => {
    const expectedData = ['310', '309', '308', '307', '306', '305', '304']

    const api = new WeatherApi(new MockWeatherAPIService())
    const receivedData = await api.getAvailableSols()
    expect(expectedData).deep.equal(receivedData);
  });
});
