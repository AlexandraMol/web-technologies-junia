import { useState } from 'react'
import type { AuthorExtendedModel } from '../AuthorModel'

export const useAuthortDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [author, setAuthor] = useState<AuthorExtendedModel | null>(null)

  const loadAuthor = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/authors/${id}`)
      .then(response => response.json())
      .then(data => setAuthor(data))
      .finally(() => setIsLoading(false))
  }

  return { isLoading, author, loadAuthor }
}
