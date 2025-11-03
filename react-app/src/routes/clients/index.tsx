import { createFileRoute } from '@tanstack/react-router'
import { ClientsPage } from '../../domains/clients/pages/ClientsPage'

export const Route = createFileRoute('/clients/')({
  component: ClientsPage,
})
