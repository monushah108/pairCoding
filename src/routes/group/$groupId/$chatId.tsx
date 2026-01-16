import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/group/$groupId/$chatId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/group/$chatId"!</div>
}
