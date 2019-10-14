import express from 'express'
import expressGraphQL from 'express-graphql'
import {root} from './graphql/resolvers'
import {schema} from './graphql/scema'
import WeatherApi from './weatherAPI/weatherApi'
import Cache from './cache/cache'
import WeatherAPIService from './weatherAPI/watherAPIService'
import {solModel} from './database/db'

// Create an express server and a GraphQL endpoint
const app = express()
app.use('/api', expressGraphQL({
  schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/api'))

// Create instance of weather API
export const weatherAPI = new WeatherApi(new WeatherAPIService(), new Cache(), solModel)

// Getting data at the start and updating existing data every 5 minutes
const updateData = async () => {
  await weatherAPI.updateData()
}

updateData()

setInterval(() => {
  updateData()
}, 1000 * 60 * 5) // 5 minutes
