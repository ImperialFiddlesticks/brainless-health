import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pickYourZombieScreen/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pickYourZombieScreen/"!</div>
}
