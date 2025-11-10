import { Outlet } from '@tanstack/react-router'
import { AuthorList } from '../../authors/components/AuthorList'

export function AuthorPage() {
  return (
    <div>
      <AuthorList />
      <Outlet />
    </div>
  )
}
