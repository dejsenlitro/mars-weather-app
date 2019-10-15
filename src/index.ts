import express from 'express'
import expressGraphQL from 'express-graphql'
import Database from './database/database'
import root from './graphql/resolvers'
import schema from './graphql/schema'
import WeatherApi from './weatherAPI/weatherApi'
import Cache from './cache/cache'
import WeatherAPIService from './weatherAPI/watherAPIService'

// Create an express server and a GraphQL endpoint
const app = express()
app.use('/api', expressGraphQL({
  schema,
  rootValue: root,
  graphiql: true,
  customFormatErrorFn: (err) => {
    return err.message
  },
}))
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/api'))

// Create instance of weather API
const database = new Database()
export const weatherAPI = new WeatherApi(new WeatherAPIService(), new Cache(), database)

// Getting data at the start and updating existing data every 5 minutes
const updateData = async () => {
  await weatherAPI.updateSolsData()
}

updateData()

setInterval(() => {
  updateData()
}, 1000 * 60 * 5) // 5 minutes
