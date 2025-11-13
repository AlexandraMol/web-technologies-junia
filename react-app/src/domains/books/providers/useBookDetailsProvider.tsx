import { useState } from 'react'
import axios from 'axios'
import type { BookModel, UpdateBookModel } from '../BookModel'
import type { ClientModel } from '../../clients/ClientModel'
import type { CreateSaleInput } from '../components/CreateSaleModal'

type BookClientsResponse = {
  totalCount: number
  data: ClientModel[]
}

type ClientListResponse = {
  totalCount: number
  data: ClientModel[]
}

export const useBookDetailsProvider = () => {
  const [book, setBook] = useState<BookModel | null>(null)
  const [numberOfClients, setNumberOfClients] = useState(0)

  // 👇 buyers = people who already bought this book
  const [buyers, setBuyers] = useState<ClientModel[]>([])

  // 👇 all clients in the system (for the Select in the modal)
  const [clients, setClients] = useState<ClientModel[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const loadBookDetails = (bookId: string): void => {
    setIsLoading(true)

    // book details
    const bookPromise = axios
      .get<BookModel>(`http://localhost:3000/books/${bookId}`)
      .then(res => {
        setBook(res.data)
      })

    // clients who bought this book (shopping history)
    const buyersPromise = axios
      .get<BookClientsResponse>(
        `http://localhost:3000/books/${bookId}/clients`,
      )
      .then(res => {
        setBuyers(res.data.data)
        setNumberOfClients(res.data.totalCount)
      })

    // all clients (for the "Select client" dropdown)
    const clientsPromise = axios
      .get<ClientListResponse>('http://localhost:3000/clients')
      .then(res => {
        setClients(res.data.data)
      })

    Promise.all([bookPromise, buyersPromise, clientsPromise])
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }

  const updateBook = (id: string, input: UpdateBookModel): void => {
    axios
      .patch(`http://localhost:3000/books/${id}`, input)
      .then(() => {
        loadBookDetails(id)
      })
      .catch(err => console.error(err))
  }

  const createSale = (input: CreateSaleInput): void => {
    axios
      .post('http://localhost:3000/sales', input)
      .then(() => {
        // reload buyers, count & history after creating a sale
        loadBookDetails(input.bookId)
      })
      .catch(err => console.error(err))
  }

  return {
    book,
    numberOfClients,
    buyers,   // 👈 history
    clients,  // 👈 all clients for the modal
    isLoading,
    loadBookDetails,
    updateBook,
    createSale,
  }
}
