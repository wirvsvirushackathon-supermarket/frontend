import { request } from 'graphql-request'
import env from '../env'

export type CreateUserPayload = {
  firstName: string
  lastName: string
  uuid: string
}
export const createUser = async ({
  firstName,
  lastName,
  uuid
}: CreateUserPayload) => {
  const query = `
    mutation createUser {
    createUser(createUserInput:{
      uuid: ${uuid}
      surname: ${lastName}
      lastname: ${firstName}
    }) {
      id
    }
  }
`
  const rest = await request(env.gqlEndpoint, query)
  console.log(res)
}
