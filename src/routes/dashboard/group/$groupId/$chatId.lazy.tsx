import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/group/$groupId/$chatId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/group/$groupId/$chatId"!</div>
}
