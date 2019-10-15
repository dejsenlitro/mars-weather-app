import {expect} from 'chai'
import Database from '../src/database/database'
import WeatherApi from '../src/weatherAPI/weatherApi'
import MockWeatherAPIService from '../src/weatherAPI/mockWeatherAPIService'
import Cache from '../src/cache/cache'

const api = new WeatherApi(new MockWeatherAPIService(), new Cache(), new Database())

// TODO: Is this really needed?
describe('Available Sols', () => {
  it('limit 3, page 1, total 7', async () => {
    const expectedResult: string[] =  ['310', '309', '308']

    const limit: number = 3
    const page: number = 1

    const receivedData = await api.getSolsWithMeasurements(limit, page)
    const solsReturned: string[] = receivedData.sols.map((ed) => ed.sol)
    expect(expectedResult.toString()).equal(solsReturned.toString())
  })

  it('limit 3, page 2, total 7', async () => {
    const expectedResult: string[] =  ['307', '306', '305']

    const limit: number = 3
    const page: number = 2

    const receivedData = await api.getSolsWithMeasurements(limit, page)
    const solsReturned: string[] = receivedData.sols.map((ed) => ed.sol)
    expect(expectedResult.toString()).equal(solsReturned.toString())
  })

  it('limit 3, page 3, total 7', async () => {
    const expectedResult: string[] = ['304']

    const limit: number = 3
    const page: number = 3

    const receivedData = await api.getSolsWithMeasurements(limit, page)
    const solsReturned: string[] = receivedData.sols.map((ed) => ed.sol)
    expect(expectedResult.toString()).equal(solsReturned.toString())
  })
})
