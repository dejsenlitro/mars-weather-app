import {ApolloServer, PubSub} from 'apollo-server'
import Cache from './cache/cache'
import Database from './database/database'
import resolvers from './graphql/resolvers'
import schema from './graphql/schema'
import WeatherAPIService from './weatherAPI/watherAPIService'
import WeatherApi from './weatherAPI/weatherApi'

export const pubsub = new PubSub()
export const MEASUREMENTS_CHANGED = 'MEASUREMENTS_CHANGED'

const server = new ApolloServer({typeDefs: schema, resolvers})

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})

// Create instance of weather API
export const weatherAPI = new WeatherApi(new WeatherAPIService(), new Cache(), new Database())

weatherAPI.updateSolsData()

setInterval(() => {
  weatherAPI.updateSolsData()
}, 1000 * 60 * 5) // 5 minutes
