import { useState } from 'react'
import type { ClientBooksModel } from '../ClientModel'

export const useClientBooksProvider = (id: string) => {
  const [isLoadingBooks, setIsLoadingBooks] = useState(false)
  const [clientBooks, setClientBooks] = useState<ClientBooksModel[] | null>(
    null,
  )

  const loadClientBooks = () => {
    setIsLoadingBooks(true)
    fetch(`http://localhost:3000/clients/${id}/books`)
      .then(response => response.json())
      .then(data => setClientBooks(data.data))
      .finally(() => setIsLoadingBooks(false))
  }

  return { isLoadingBooks, clientBooks, loadClientBooks }
}
