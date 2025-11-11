import { Outlet } from '@tanstack/react-router'

export function AuthorsDetailsPage() {
  return (
    <div>
      This is the author page
      <Outlet />
    </div>
  )
}
