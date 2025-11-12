import { useState } from 'react'
import type { BookExtendedModel } from '../BookModel'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookExtendedModel | null>(null)

  const loadBook = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .finally(() => setIsLoading(false))
  }

  return { isLoading, book, loadBook }
}
