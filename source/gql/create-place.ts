import { request } from 'graphql-request'
import env from '../env'

export const getTicket = async ({ name, placeId }) => {
  const query = `
    mutation {
      createPlace(createPlaceInput: {
        name: "${name}"
        openingTime: “2020-04-27T08:00:00"
        closingTime: “2020-04-27T20:00:00”
        slotCount: 30
        slotSize: “PT1H”
        placeId: ${placeId}
      }) {
      name
    }
  }
`
  const rest = await request(env.gqlEndpoint, query)
  console.log(res)
}
