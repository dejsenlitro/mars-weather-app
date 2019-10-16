import {gql} from 'apollo-server'

export default gql(`
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
      limit: Int
      page: Int
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

    type Subscription {
		  changedSols: solsResult
	  }
`)
