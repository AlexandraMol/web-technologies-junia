// src/routes/books.$bookId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { BookPageDetails } from '../domains/books/pages/BookPageDetails'

export const Route = createFileRoute('/books/$bookId')({
  component: BookPageDetails,
})
