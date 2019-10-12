import {expect} from 'chai'
import WeatherApi from '../src/weatherAPI/weatherApi';
import MockWeatherAPIService from '../src/weatherAPI/mockWeatherAPIService';
import {IGetSolsReponse} from "../src/weatherAPI/models";
import Cache from "../src/cache/cache";

const api = new WeatherApi(new MockWeatherAPIService(), new Cache())

describe('Available Sols', () => {
  it('limit 3, page 1, total 7', async () => {
    const expectedData: IGetSolsReponse = {
      sols: ['310', '309', '308'],
      totalItems: 7,
    }

    const limit: number = 3
    const page: number = 1

    const receivedData = await api.getAvailableSols(limit, page)
    expect(expectedData).deep.equal(receivedData);
  });

  it('limit 3, page 2, total 7', async () => {
    const expectedData: IGetSolsReponse = {
      sols: ['307', '306', '305'],
      totalItems: 7,
    }

    const limit: number = 3
    const page: number = 2

    const receivedData = await api.getAvailableSols(limit, page)
    expect(expectedData).deep.equal(receivedData);
  });

  it('limit 3, page 3, total 7', async () => {
    const expectedData: IGetSolsReponse = {
      sols: ['304'],
      totalItems: 7,
    }

    const limit: number = 3
    const page: number = 3

    const receivedData = await api.getAvailableSols(limit, page)
    expect(expectedData).deep.equal(receivedData);
  });
});
