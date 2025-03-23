# Project Architecture

This project follows a **modular architecture** with a focus on **separation of concerns**, **vertical slicing**, and **decoupling** of dependencies, making it scalable and maintainable.

It is inspired by **Hexagonal Architecture** but implemented in a lighter way, balancing structure and simplicity without overengineering.

## Folder Structure

```
├── src/
│   ├── core/             # Vertical slices with domain, application, and infrastructure layers
│   ├── graphql/          # GraphQL operations and clients
│   ├── shared/           # Shared utilities across the app (helpers, constants, etc.)
│   ├── state/            # App state management
│   ├── theme/            # Theme config, and provider setup
│   ├── UI/               # Reusable UI components
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── end-to-end/           # E2E tests with Playwright
├── test/                 # Unit and integration tests
├── public/               # Static assets
├── .husky/               # Git hooks
```

## Vertical Slicing in `core`

Inside the `core/` folder, we use the **vertical slicing** pattern, organizing each feature or domain as a vertical slice with its own structure for `domain`, `application`, and `infrastructure`. This allows for isolated development per feature, improving scalability and enabling unit testing.

### Layers inside each slice:

- **domain**: Defines the business logic and domain model (rules, entities, interfaces).
- **application**: Contains use cases and application-specific logic.
- **infrastructure**: Provides concrete implementations of interfaces declared in `domain` (e.g., GraphQL interceptors or service adapters).

## Decoupling UI from GraphQL with `useService`

To keep UI components independent from the technology used for data fetching (such as GraphQL), we use the `useService` pattern. This pattern consists of abstracting data fetching and mutations into reusable services. UI components then consume hooks like `useService`, without depending directly on any GraphQL client.

This design enables easier testing and allows us to change the underlying implementation without affecting UI components.

---

Let me know if you want to include a concrete code example or visual diagram to enrich this documentation.

