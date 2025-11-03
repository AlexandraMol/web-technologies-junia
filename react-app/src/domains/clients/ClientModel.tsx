export type ClientModel = {
  client: {
    id: string
    firstName: string
    lastName: string
    email?: string
    pictureUrl?: string
  }
  numberOfBooksBought: number
}
