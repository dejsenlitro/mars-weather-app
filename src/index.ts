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
        sols(
          limit: Int,
          page: Int
        ): solsResult
    }
    
    type solsResult {
      sols: [String]!
      totalItems: Int
  }
`);

// Root resolver
const root = {
  sols: async ({ limit = 7, page = 1 }: { limit: number, page: number}) => {
    return await weatherAPI.getAvailableSols(limit, page)
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
