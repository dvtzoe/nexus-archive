import Fastify from 'fastify'
import cors from '@fastify/cors'

import { NexusNode } from '@nexus-archive/types'

const fastify = Fastify({ logger: true })

// Register CORS
fastify.register(cors, {
  origin: true,
})

// TODO: Replace with a real database
const nodes = new Map<string, NexusNode>()

nodes.set('node-1', {
  id: 'node-1',
  content: '<h1>Welcome to Nexus Archive</h1><p>This is the first node of our story.</p>',
})

nodes.set('node-2', {
  id: 'node-2',
  content: '<h1>Chapter 2</h1><p>The adventure continues...</p>',
})

// Simple API
fastify.get('/api/nodes/:id', async (request, reply) => {
  const { id } = request.params as { id: string }
  const node = nodes.get(id)
  if (node) {
    return node
  } else {
    reply.status(404).send({ error: 'Node not found' })
  }
})
