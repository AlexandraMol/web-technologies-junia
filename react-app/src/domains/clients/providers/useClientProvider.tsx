import { useState } from 'react'
import type {
  ClientExtendedModel,
  ClientModel,
  CreateClientModel,
} from '../ClientModel'
import axios from 'axios'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientExtendedModel[]>([])

  const loadClients = () => {
    axios
      .get('http://localhost:3000/clients')
      .then(data => {
        setClients(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createClient = (client: CreateClientModel) => {
    axios
      .post('http://localhost:3000/clients', client)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const updateClient = (id: string, input: ClientModel) => {
    console.log(input)
    axios
      .patch(`http://localhost:3000/clients/${id}`, input)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const deleteClient = (id: string) => {
    axios
      .delete(`http://localhost:3000/clients/${id}`)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  return { clients, loadClients, createClient, updateClient, deleteClient }
}
