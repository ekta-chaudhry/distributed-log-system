# Distributed Log Processing System (Mini Datadog)

A production-grade distributed log processing pipeline where multiple application servers send logs to a central system that collects, buffers, processes, stores, and makes them queryable.

## Architecture

```
Agents (gRPC streaming) → Collector → Redis Streams → Processors (consumer group) → Postgres (batched) → Query API (REST + SSE)
```

## Tech Stack

- **TypeScript** — all services
- **gRPC** — agent-to-collector communication (`@grpc/grpc-js`, `proto-loader`)
- **Redis Streams** — message broker between collector and processors
- **PostgreSQL** — log storage (partitioned, indexed, batched inserts)
- **REST + SSE** — query API layer
- **Prometheus + Grafana** — monitoring and dashboards
- **Docker Compose** — orchestration
- **k6** — load testing

## Project Structure

```
distributed-log-system/
├── services/
│   ├── agent/          # Sends logs to collector
│   ├── collector/      # Receives logs via gRPC, publishes to Redis
│   ├── processor/      # Consumes from Redis, writes to Postgres
│   └── query-api/      # REST + SSE API for querying logs
├── shared/
│   ├── proto/          # gRPC protocol buffer definitions
│   └── types/          # Shared TypeScript types
├── pnpm-workspace.yaml
├── LEARNINGS.md
└── README.md
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the collector
cd services/collector && pnpm dev

# Start the agent
cd services/agent && pnpm dev
```

## Documentation

- [LEARNINGS.md](./LEARNINGS.md) — surprises, trade-offs, and benchmarks discovered along the way