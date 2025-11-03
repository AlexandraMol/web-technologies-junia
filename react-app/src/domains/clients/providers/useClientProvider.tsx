import { useState } from 'react'
import type { ClientModel } from '../ClientModel'
import axios from 'axios'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([])

  const loadClients = () => {
    axios
      .get('http://localhost:3000/clients')
      .then(data => {
        setClients(data.data.data)
      })
      .catch(err => console.error(err))
  }

  return { clients, loadClients }
}
