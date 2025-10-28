import { createFileRoute } from '@tanstack/react-router'
import { BooksPage } from '../../domains/books/pages/BooksPage'

export const Route = createFileRoute('/books/')({
  component: BooksPage,
})
