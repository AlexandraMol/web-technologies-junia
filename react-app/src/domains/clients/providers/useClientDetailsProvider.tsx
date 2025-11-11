import { useState } from 'react'
import type { ClientModel } from '../ClientModel'

export const useClientDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<ClientModel | null>(null)

  const loadClient = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/clients/${id}`)
      .then(response => response.json())
      .then(data => setClient(data))
      .finally(() => setIsLoading(false))
  }

  return { isLoading, client, loadClient }
}
