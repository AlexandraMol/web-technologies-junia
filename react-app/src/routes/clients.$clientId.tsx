import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clients/$clientId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clients/$clientId"!</div>
}
