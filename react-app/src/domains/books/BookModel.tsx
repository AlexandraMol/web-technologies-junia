export type BookAuthorModel = {
  firstName: string
  lastName: string
}

export type BookModel = {
  id: string
  title: string
  author: BookAuthorModel
  yearPublished: number
  pictureUrl: string
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  pictureUrl: string
}

export type BookWithNumberOfClients = {
  book: BookModel
  numberOfClients: number
}

export type GetBooksResponse = {
  totalCount: number
  data: BookWithNumberOfClients[]
}

export type UpdateBookModel = Partial<CreateBookModel>
