import {IDatabase} from '../database/interfaces'
import {IWeatherAPI, IWeatherAPIService} from './interfaces'
import {IGetSolsReponse, ISol, ISolDb} from './models'
import {ICache} from '../cache/interfaces'
import equal from 'deep-equal'

export default class WeatherApi implements IWeatherAPI {
  private weatherAPIService: IWeatherAPIService
  private cache: ICache
  private database: IDatabase

  constructor(weatherAPIService: IWeatherAPIService, cache: ICache, database: IDatabase) {
    this.weatherAPIService = weatherAPIService
    this.cache = cache
    this.database = database
  }

  public async getSolsWithMeasurements(limit: number, page: number): Promise<IGetSolsReponse> {
    try {
      const sols: ISol[] = await this.getSolsData()
      const totalItems: number = sols.length

      const response: IGetSolsReponse = {
        sols: sols.slice((page - 1) * limit, page * limit),
        totalItems,
      }

      return response
    } catch (e) {
      throw new Error('Failed to fetch sols')
    }
  }

  public async getSolWithMeasurements(sol: string): Promise<ISol> {
    const solsData: ISol[] = await this.getSolsData()
    const solData = solsData.find((s) => s.sol === sol)

    if (!solData)
      throw new Error('There is no data for requested sol')

    return solData
  }

  // Get new data from weather service, check if data in database is the same and update if needed
  // I query the db every time, so that the measurements for the day last sol are us updated as possible when it is removed from the API
  public async updateSolsData() {
    try {
      const data = await this.weatherAPIService.getData()
      const oldestSolInAPIKey: string = data.sol_keys[0]

      await this.updateCachedData(data)
      await this.updateDatabaseDataForLastSolInAPI(oldestSolInAPIKey)
    } catch (e) {
      console.error(e)
    }
  }

  private async getSolsData(): Promise<ISol[]> {
    const cachedData = this.cache.get()
    if (cachedData)
      return cachedData

    await this.updateSolsData()

    return this.cache.get()
  }

  private async updateCachedData(data) {
    const solsData: ISol[] = []
    for (const solKey of data.sol_keys) {
      const solData1: ISol = this.getSolMeasurements(data, solKey)
      solsData.push(solData1)
    }

    const solsFromDatabase: ISol[] = await this.database.getSols()
    for (const d of solsFromDatabase) {
      if (!solsData.find((s) => s.sol === d.sol))
        solsData.push(d)
    }

    solsData.sort((a, b) => +b.sol - +a.sol)

    this.cache.set(solsData)
  }

  private async updateDatabaseDataForLastSolInAPI(oldestSolInAPIKey: string) {
    const oldestSolData: ISolDb = await this.database.getSol(oldestSolInAPIKey)

    const solsData: ISol[] = await this.getSolsData()
    const solData: ISol | undefined = solsData.find((s) => s.sol === oldestSolInAPIKey)
    if (!solData)
      return

    if (oldestSolData === null) {
      await this.database.insertNewSol(solData)
    } else {
      const solDataDb: ISolDb = oldestSolData

      if (!equal(solData.pressure, solDataDb.pressure) ||
        !equal(solData.atmosphericTemperate, solDataDb.atmosphericTemperate) ||
        !equal(solData.horizontalWindSpeed, solDataDb.horizontalWindSpeed)
      ) {
        await this.database.updateSol(solData, solDataDb._id)
      }
    }
  }

  private getSolMeasurements(data, sol: string): ISol {
    const solMeasurements = data[sol]
    const tempMeasurement = solMeasurements.AT
    const pressureMeasurement = solMeasurements.PRE
    const windMeasurements = solMeasurements.HWS
    const solData: ISol = {
      sol,
      atmosphericTemperate: {
        average: tempMeasurement.av,
        minimum: tempMeasurement.mn,
        maximum: tempMeasurement.mx,
        measurementsCount: tempMeasurement.ct,
      },
      horizontalWindSpeed: {
        average: pressureMeasurement.av,
        minimum: pressureMeasurement.mn,
        maximum: pressureMeasurement.mx,
        measurementsCount: pressureMeasurement.ct,
      },
      pressure: {
        average: windMeasurements.av,
        minimum: windMeasurements.mn,
        maximum: windMeasurements.mx,
        measurementsCount: windMeasurements.ct,
      },
    }

    return solData
  }
}
