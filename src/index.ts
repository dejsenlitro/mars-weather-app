import express from 'express'
import expressGraphQL from "express-graphql";
import {buildSchema} from "graphql";
import WeatherApi from "./weatherAPI/weatherApi";
import Cache from "./cache/cache";
import WeatherAPIService from "./weatherAPI/watherAPIService";

const cache = new Cache()
const weatherAPI = new WeatherApi(new WeatherAPIService(), cache)

// GraphQL schema
const schema = buildSchema(`
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
`);

// TODO: Try to find possible improvements
// Root resolver
const root = {
  getSols: async ({ limit = 7, page = 1 }: { limit: number, page: number}) => {
    return await weatherAPI.getAvailableSolsMeasurements(limit, page)
  },
  getSol: async ({sol}: {sol: string}) => {
    return await weatherAPI.getSolData(sol)
  }
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/api', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/api'));


// Getting data at the start and updating existing data every 5 minutes
const updateData = async () => {
  await weatherAPI.updateData()
}

updateData()

setInterval(() => {
  updateData()
}, 1000*60*5) // 5 minutes

// TODO: Clean index.ts
