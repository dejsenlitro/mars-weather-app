export interface IGetSolsReponse {
  sols: ISol[]
  totalItems: number
}

export interface ISol {
  sol: string
  atmosphericTemperate: IMeasurement
  horiszontalWindSpeed: IMeasurement
  pressure: IMeasurement
}

export interface IMeasurement {
  average: number
  minimum: number
  maximum: number
  measurementsCount: number
}
