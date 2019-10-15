import {ISol, ISolDb} from '../weatherAPI/models'

export interface IDatabase {
  getSols(): Promise<ISol[]>
  getSol(sol: string): Promise<ISolDb>
  insertNewSol(solData: ISol): Promise<void>
  updateSol(solData: ISol, solDatabaseId: string): Promise<void>
}
