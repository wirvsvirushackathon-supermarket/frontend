import { request } from 'graphql-request'
import env from '../env'

export const getTicket = async ({ placeId }: { placeId: string }) => {
  const query = `
    query some {
      place(
        id: "${placeId}"
      ){
        code
      }
    }
`
  const res = await request(env.gqlEndpoint, query)
}
