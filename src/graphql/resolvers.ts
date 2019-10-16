import {pubsub, weatherAPI} from '../index'

export default {
  Query: {
    getSols: async (_, {limit = 7, page = 1}: { limit: number, page: number }) => {
      try {
        return await weatherAPI.getSolsWithMeasurements(limit, page)
      } catch (e) {
        throw new Error('getSols Error: ' + e.message)
      }
    },
    getSol: async (_, {sol}: { sol: string }) => {
      try {
        return await weatherAPI.getSolWithMeasurements(sol)
      } catch (e) {
        throw new Error('getSol Error: ' + e.message)
      }
    },
  },
  Subscription: {
    changedSols: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => {
        return pubsub.asyncIterator('MEASUREMENTS_CHANGED')
      },
    },
  }
}
