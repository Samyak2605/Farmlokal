# FarmLokal Backend Assignment

This repository contains the backend implementation for the FarmLokal technical assignment.  
The goal of this project is to demonstrate performance-focused backend design, Redis usage, external API reliability handling, and clean architecture using Node.js and TypeScript.

---

## 🚜 About FarmLokal

FarmLokal is a hyperlocal marketplace connecting households directly with local farmers, doodhwalas, FPOs, and small producers for daily essentials such as milk, dairy, fruits, vegetables, and groceries.

This backend is designed with **real-world production concerns** in mind:
- High performance
- Reliability
- Caching
- Concurrency handling
- Clean, modular code

---

## 🧱 Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **MySQL**
- **Redis**
- **Axios**
- **Docker (optional, for local infra)**

---

## 📁 Project Structure

```
src/
├── auth/          # OAuth token lifecycle handling
├── config/        # Environment, MySQL, Redis configs
├── external/      # External API + webhook integrations
├── middlewares/   # Rate limiting, error handling
├── products/      # Product listing (performance critical)
├── utils/         # Cache, circuit breaker, logger
├── app.ts
├── routes.ts
└── server.ts

scripts/
└── seedProducts.ts # Large dataset seeding script
```

---

## 🔐 Authentication (OAuth2 – Client Credentials)

- OAuth2 Client Credentials flow
- Access token fetched from provider
- Token cached in **Redis**
- Automatic refresh on expiry
- **Concurrency-safe token fetching** using Redis lock
- Prevents redundant token requests under load

**Key design choice:**  
Redis-based locking ensures only one request refreshes the token at a time.

---

## 🌐 External API Integrations

### API A – Synchronous
- Fetches mock product/order data
- Timeout handling
- Retries with exponential backoff
- Circuit breaker pattern to prevent cascading failures

### API B – Webhook Based
- Callback endpoint for async events
- Idempotency handling using Redis
- Duplicate event protection
- Safe retry handling

---

## 🛒 Product Listing API (Performance Critical)

### Endpoint
`GET /products`

### Features
- Pagination (cursor-based)
- Sorting (price, createdAt, name)
- Search (name, description)
- Filters (category, price range)

### Performance Strategy
- Indexed MySQL queries
- Redis caching for hot queries
- Minimal database hits
- Cache TTL-based invalidation strategy

**Target:**  
P95 response time under **200ms** for large datasets.

---

## ⚡ Reliability & Performance Techniques

Implemented:
- Redis caching
- Rate limiting (Redis-based)
- Circuit breaker for external APIs
- Connection pooling (MySQL)

---

## 🧪 Local Setup

### Prerequisites
- Node.js (18+)
- Docker (optional, recommended)

### Install dependencies
```bash
npm install
```

### Start MySQL & Redis
```bash
docker-compose up -d
```

### Run backend
```bash
npm run dev
```

Server runs on: http://localhost:3000
