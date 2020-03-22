import { request } from 'graphql-request'
import env from '../env'

export const getTicket = async () => {
  const query = `
    mutation some {
      createBooking(createBookingInput: {
        start: "2020-04-27T09:00:00"
        duration: "PT1H"
        placeId: 3
        userId: 2
      }){
        code
      }
    }
`
  const rest = await request(env.gqlEndpoint, query)
}
