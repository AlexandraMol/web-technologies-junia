export type AuthorModel = {
  author: {
    id: string
    firstName: string
    lastName: string
    pictureUrl?: string
  }
  numberOfBooks: number
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  pictureUrl?: string
}