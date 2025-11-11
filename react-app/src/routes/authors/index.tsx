import { createFileRoute } from '@tanstack/react-router'
import { AuthorPage } from '../../domains/authors/pages/AuthorsPage'

export const Route = createFileRoute('/authors/')({
  component: AuthorPage,
})
