import { createFileRoute } from '@tanstack/react-router'
import { AuthorPage } from '../../domains/authors/pages/AuthorPage'

export const Route = createFileRoute('/authors/')({
  component: AuthorPage,
})
