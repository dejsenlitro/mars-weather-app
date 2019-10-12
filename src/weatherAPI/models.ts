export interface IGetSolsReponse {
  sols: string[]
  totalItems: number
}

export interface ISol {
  atmosphericTemperate: IMeasurement[]
  horiszontalWindSpeed: IMeasurement[]
  pressure: IMeasurement[]
}

export interface IMeasurement {
  average: number
  minimum: number
  maximum: number
  measurementsCount: number
}
