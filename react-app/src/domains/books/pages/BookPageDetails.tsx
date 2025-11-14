// src/domains/books/pages/BookPageDetails.tsx
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { useParams } from '@tanstack/react-router'

import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { BookDetails } from '../components/BookDetails'

export function BookPageDetails(): ReactElement {
  const { bookId } = useParams({ from: '/books/$bookId' })

  const {
    book,
    numberOfClients,
    buyers,
    clients,
    isLoading,
    loadBookDetails,
    updateBook,
    createSale,
  } = useBookDetailsProvider()

  useEffect(() => {
    if (bookId) {
      loadBookDetails(bookId)
    }
  }, [bookId])

  if (!book && isLoading) {
    return (
      <div style={{ padding: 24 }}>
        <Spin />
      </div>
    )
  }

  return (
    <BookDetails
      book={book}
      numberOfClients={numberOfClients}
      buyers={buyers}
      clients={clients}
      onCreateSale={createSale}
      onUpdate={updateBook}
    />
  )
}
