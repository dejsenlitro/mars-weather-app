export interface IGetSolsReponse {
  sols: ISol[]
  totalItems: number
  limit: number
  page: number
}

export interface ISol {
  sol: string
  atmosphericTemperate: IMeasurement
  horizontalWindSpeed: IMeasurement
  pressure: IMeasurement
}

export interface ISolDb extends  ISol{
  _id: string
}

export interface IMeasurement {
  average: number
  minimum: number
  maximum: number
  measurementsCount: number
}
