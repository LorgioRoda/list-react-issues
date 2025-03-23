# 🚀 Issues Viewer - React

This project is a client-side application built with **React**, **Apollo Client**, and **Vite**, that consumes GitHub's **GraphQL API** to display repository issues in a user-friendly.

## 🖥 Requirements to run locally

### 1. Node and pnpm
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [pnpm](https://pnpm.io/)

### 2. Clone the repository
```bash
git clone https://github.com/LorgioRoda/mi-repo.git
cd mi-repo
pnpm install
```

### 3. Setup the `.env` file

You need a **GitHub token** to query their GraphQL API.

> ℹ️ Use a token **without scopes** for public data (like issues).

Create a `.env` file in the root directory with:

```env
VITE_GITHUB_TOKEN=your_token_here
```

### 4. Start the development server
```bash
pnpm dev
```

It will be available at `http://localhost:5173`

---

## 🌟 Features
- Filter issues by state: `All`, `Open`, `Closed`
- Debounced search
- Modal with comments
- Loading skeleton and error messages
- Unit and integration tests (`vitest`)
- End-to-end tests (`playwright`)

---

## 🎥 Demo

_You can add a video or demo preview of the project here._

---

## 🧠 Architecture

The project follows a **hexagonal architecture-inspired** folder structure, separating domain logic, infrastructure, UI, and shared services.

👉 Learn more in [README.arquitectura.md](./README.arquitectura.md)

---

> ✉️ Feel free to open an issue or PR for any questions or improvements.
