export type AuthorModel = {
  author: {
    id: string
    firstName: string
    lastName: string
    pictureUrl: string
  }
  numberOfBooks: number
}

export type AuthorExtendedModel = {
  id: string
  firstName: string
  lastName: string
  pictureUrl: string
  stats: {
    booksCount: number
    salesCount: number
    averageSalesPerBook: number
  }
}

export type AuthorStatsModel = Partial<AuthorExtendedModel['stats']>

export type UpdateAuthorModel = {
  firstName: string
  lastName: string
  pictureUrl: string
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  pictureUrl?: string
}
