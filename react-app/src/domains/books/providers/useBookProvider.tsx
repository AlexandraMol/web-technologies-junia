import { useState } from 'react'
import type {
  BookWithNumberOfClients,
  CreateBookModel,
  UpdateBookModel,
  GetBooksResponse,
} from '../BookModel'
import axios from 'axios'

export const useBookProvider = () => {
  // store the full objects: { book, numberOfClients }
  const [books, setBooks] = useState<BookWithNumberOfClients[]>([])

  const loadBooks = () => {
    axios
      .get<GetBooksResponse>('http://localhost:3000/books')
      .then(res => {
        setBooks(res.data.data)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateBookModel) => {
    axios
      .post('http://localhost:3000/books', book)
      .then(() => {
        loadBooks()
      })
      .catch(err => {
        console.error('Create book error:', err.response?.data ?? err)
      })
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    axios
      .patch(`http://localhost:3000/books/${id}`, input)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  return { books, loadBooks, createBook, updateBook, deleteBook }
}
