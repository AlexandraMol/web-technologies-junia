import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetailsPage } from '../domains/authors/pages/AuthorPageDetails'

export const Route = createFileRoute('/author/$authorId')({
  component: AuthorDetailsPage,
})
