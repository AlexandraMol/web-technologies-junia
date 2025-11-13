import { useState } from 'react'
import type {
  BookModel,
  CreateBookModel,
  UpdateBookModel,
  GetBooksResponse,
  BookWithNumberOfClients,
} from '../BookModel'
import axios from 'axios'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])

  const loadBooks = () => {
    axios
      .get<GetBooksResponse>('http://localhost:3000/books')
      .then(res => {
        const raw: BookWithNumberOfClients[] = res.data.data

        const booksOnly: BookModel[] = raw.map(entry => entry.book)

        setBooks(booksOnly)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateBookModel) => {
    axios
      .post('http://localhost:3000/books', book)
      .then(loadBooks)
      .catch(err => console.error(err))
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    axios
      .patch(`http://localhost:3000/books/${id}`, input)
      .then(loadBooks)
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(loadBooks)
      .catch(err => console.error(err))
  }

  return { books, loadBooks, createBook, updateBook, deleteBook }
}
