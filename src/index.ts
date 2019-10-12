import express from 'express'
import expressGraphQL from "express-graphql";
import {buildSchema} from "graphql";
import MockWeatherAPIService from "./weatherAPI/mockWeatherAPIService";
import WeatherApi from "./weatherAPI/weatherApi";

// GraphQL schema
const schema = buildSchema(`
    type Query {
        sols: [String]
    }
`);

// Root resolver
const root = {
  sols: async () => {
    const api = new WeatherApi(new MockWeatherAPIService())
    return await api.getAvailableSols()
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

