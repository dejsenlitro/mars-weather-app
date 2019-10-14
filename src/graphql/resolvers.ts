import {weatherAPI} from '../index'

export const root = {
  getSols: async ({ limit = 7, page = 1 }: { limit: number, page: number}) => {
    return await weatherAPI.getAvailableSolsMeasurements(limit, page)
  },
  getSol: async ({sol}: {sol: string}) => {
    return await weatherAPI.getSolData(sol)
  },
}
