// GraphQL schema
import {buildSchema} from 'graphql'

export default buildSchema(`
    type Query {
      getSols(
        limit: Int,
        page: Int
      ): solsResult

      getSol(
        sol: String,
      ): solData
    }

    type solsResult {
      sols: [solData],
      totalItems: Int
    }

    type solData {
      sol: String
      atmosphericTemperate: measurement,
      horizontalWindSpeed: measurement,
      pressure: measurement
    }

    type measurement {
      average: Float,
      minimum: Float,
      maximum: Float,
      measurementsCount: Float
    }
`)
