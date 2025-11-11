import { createFileRoute } from '@tanstack/react-router'
import { AuthorsDetailsPage } from '../domains/authors/pages/AuthorsPageDetails'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorsDetailsPage,
})
