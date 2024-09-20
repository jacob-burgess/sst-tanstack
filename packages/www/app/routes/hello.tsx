import { createFileRoute } from '@tanstack/react-router'
import { HELLO } from '@sst-tanstack/core'

export const Route = createFileRoute('/hello')({
  component: () => (
    <div>
      <h1>Hello /hello!</h1>
      <p>{HELLO}</p>
    </div>
  ),
})
