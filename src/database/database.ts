import mongoose from 'mongoose'
import {ISol, ISolDb} from '../weatherAPI/models'
import {IDatabase} from './interfaces'

export default class Database implements IDatabase {
  private readonly solModel: any

  constructor() {
    mongoose.connect('mongodb://localhost/sols', {useNewUrlParser: true, useFindAndModify: false })

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('connected')
    })

    const solSchema = new mongoose.Schema({
      sol: {
        type: String,
        unique: true,
      },
      atmosphericTemperate: {
        average: Number,
        minimum: Number,
        maximum: Number,
        measurementsCount: Number,
      },
      horizontalWindSpeed: {
        average: Number,
        minimum: Number,
        maximum: Number,
        measurementsCount: Number,
      },
      pressure: {
        average: Number,
        minimum: Number,
        maximum: Number,
        measurementsCount: Number,
      },
    })

    const solModel = mongoose.model('SolModel', solSchema)

    this.solModel = solModel
  }

  public async getSol(sol: string): Promise<ISolDb> {
    const dbResponse = await this.solModel.findOne({sol})

    return dbResponse === null ? undefined : dbResponse._doc
  }

  public async getSols(): Promise<ISol[]> {
    const dataDb = await this.solModel.find()
    const solsFromDatabase: ISol[] = dataDb.map((d) => d._doc)
      .sort((a, b) => +b.sol - +a.sol)
      .slice(1, dataDb.length)

    return solsFromDatabase
  }

  public async insertNewSol(solData: ISol): Promise<void> {
    const newSol = new this.solModel(solData)
    await newSol.save(solData)
  }

  public async updateSol(solData: ISol, solDatabaseId: string): Promise<void> {
    await this.solModel.updateOne({_id: solDatabaseId}, solData)
  }
}
