import { useState } from 'react'
import type { BookModel } from '../../books/BookModel'

export const useAuthorBooksProvider = (id: string) => {
  const [isLoadingBooks, setIsLoadingBooks] = useState(false)
  const [authorBooks, setAuthorBooks] = useState<BookModel[] | null>(null)

  const loadAuthorBooks = () => {
    setIsLoadingBooks(true)
    fetch(`http://localhost:3000/authors/${id}/books`)
      .then(response => response.json())
      .then(data => setAuthorBooks(data.data))
      .finally(() => setIsLoadingBooks(false))
  }

  return { isLoadingBooks, authorBooks, loadAuthorBooks }
}
