import {weatherAPI} from '../index'

export default {
  getSols: async ({ limit = 7, page = 1 }: { limit: number, page: number}) => {
    try {
      return await weatherAPI.getSolsWithMeasurements(limit, page)
    } catch (e) {
      throw new Error('getSols Error: ' + e.message)
    }
  },
  getSol: async ({sol}: {sol: string}) => {
    try {
      return await weatherAPI.getSolWithMeasurements(sol)
    } catch (e) {
      throw new Error('getSol Error: ' + e.message)
    }
  },
}
