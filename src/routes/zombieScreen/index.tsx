import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/zombieScreen/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/zombieScreen/"!</div>
}
