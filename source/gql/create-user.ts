import { request } from 'graphql-request'
import env from '../env'

export type CreateUserPayload = {
  firstName: string
  lastName: string
}
export const createUser = async ({
  firstName,
  lastName
}: CreateUserPayload) => {
  const query = `
    mutation createUser {
    createUser(createUserInput:{
      surname: "${lastName}"
      name: "${firstName}"
    }) {
      uuid
      name
      surname
    }
  }
`
  const res = await request(env.gqlEndpoint, query).catch(() => {})

  const { uuid } = res.createUser
  return { uuid, firstName, lastName } as CreateUserPayload & {
    uuid: string
  }
}
