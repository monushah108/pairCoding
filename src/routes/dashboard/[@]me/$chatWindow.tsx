import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/@me/$chatWindow')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/@me/$chatWindow"!</div>
}
