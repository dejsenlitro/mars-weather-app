import {ISol} from '../weatherAPI/models'

export interface ICache {
  get(): ISol[]
  set(data: ISol[]): void
}
