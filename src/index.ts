import express from 'express'
import expressGraphQL from "express-graphql";
import {buildSchema} from "graphql";
import MockWeatherAPIService from "./weatherAPI/mockWeatherAPIService";
import WeatherApi from "./weatherAPI/weatherApi";

const weatherAPI = new WeatherApi(new MockWeatherAPIService())

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

