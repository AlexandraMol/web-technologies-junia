export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email?: string
  pictureUrl?: string
}

export type ClientExtendedModel = {
  client: {
    id: string
    firstName: string
    lastName: string
    email?: string
    pictureUrl?: string
  }
  numberOfBooksBought: number
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  pictureUrl?: string
}

export type ClientBooksModel = {
  id: string
  title: string
  soldAt: Date
  author: {
    firstName: string
    lastName: string
  }
}
