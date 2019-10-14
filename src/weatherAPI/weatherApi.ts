import {IWeatherAPI, IWeatherAPIService} from './interfaces'
import {IGetSolsReponse, ISol, ISolDb} from './models'
import {ICache} from '../cache/interfaces'
import equal from 'deep-equal'

export default class WeatherApi implements IWeatherAPI {
  private weatherAPIService: IWeatherAPIService
  private cache: ICache
  private readonly solModel: any

  constructor(weatherAPIService: IWeatherAPIService, cache: ICache, solModel: any) {
    this.weatherAPIService = weatherAPIService
    this.cache = cache
    this.solModel = solModel
  }

  // Get new data from weather service, check if data in database is the same and update if needed
  public async updateData() {
    const data = await this.weatherAPIService.getData()

    this.cache.set(data)

    const oldestSol: string = data.sol_keys[0]
    const dbResponse = await this.solModel.findOne({sol: oldestSol})

    const solData: ISol = await this.getSolData(oldestSol)

    if (dbResponse === null) {
      const newSol = new this.solModel(solData)
      await newSol.save(solData)
    } else {
      const solDataDb: ISolDb = dbResponse._doc

      if (!equal(solData.pressure, solDataDb.pressure) ||
        !equal(solData.atmosphericTemperate, solDataDb.atmosphericTemperate) ||
        !equal(solData.horizontalWindSpeed, solDataDb.horizontalWindSpeed)
      ) {
        await this.solModel.updateOne({_id: solDataDb._id}, solData)
      }
    }
  }

  public async getData(): Promise<any> {
    const cachedData = this.cache.get()
    if (cachedData)
      return cachedData

    const data = await this.weatherAPIService.getData()
    this.cache.set(data)

    return data
  }

  public async getSolData(sol: string): Promise<ISol> {
    const data = await this.getData()
    const solData = this.getSolMeasurements(data, sol)

    return solData

  }

  // TODO: Remove?
  public async getAvailableSols(limit: number, page: number): Promise<IGetSolsReponse> {
    const data = await this.getData()
    const availableSols: string[] = data.sol_keys
    const sorted = availableSols
      .sort((a, b) => +b - +a)
      .slice((page - 1) * limit, page * limit)

    const response: any = {
      sols: sorted,
      totalItems: availableSols.length,
    }

    return response
  }

  public async getAvailableSolsMeasurements(limit: number, page: number): Promise<IGetSolsReponse> {
    const data = await this.getData()
    const availableSols: string[] = data.sol_keys
    const sorted = availableSols
      .sort((a, b) => +b - +a)
      .slice((page - 1) * limit, page * limit)

    const resp: ISol[] = []
    for (const sol of sorted) {
      const solData: ISol = this.getSolMeasurements(data, sol)
      resp.push(solData)
    }

    const response: IGetSolsReponse = {
      sols: resp,
      totalItems: availableSols.length,
    }

    return response
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
