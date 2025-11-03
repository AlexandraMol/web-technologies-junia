import { createFileRoute } from '@tanstack/react-router'
import { ClientDetailsPage } from '../domains/clients/pages/ClientPageDetails'

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
})
