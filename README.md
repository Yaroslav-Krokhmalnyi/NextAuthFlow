# NextAuthFlow

NextAuthFlow is a modern authentication and notes application built with **Next.js App Router**.  
The project demonstrates a complete authentication flow with protected routes, session handling, and CRUD functionality, following real-world frontend architecture patterns.

🔗 **GitHub repository:**  
https://github.com/Yaroslav-Krokhmalnyi/NextAuthFlow

🌐 **Live demo:**  
https://next-auth-flow-zeta.vercel.app/

---

## 🚧 Project Status

**In progress**  
This project is actively being developed and improved as a portfolio-grade application.

---

## ✨ Features

- User registration, login, and logout
- Cookie-based authentication
- Session validation on client and server
- Protected routes
- Notes CRUD (create, read, update, delete)
- Pagination, search, and filtering
- Profile editing
- Modal routes and client-side navigation
- Loading states and error handling

---

## 🧠 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **TanStack Query (React Query)** — server state management
- **Zustand** — client state management
- **REST API**
- **Cookie-based authentication**
- **CSS Modules**

---

## 📁 Project Structure

```
app/            # App Router pages, layouts, and route groups
components/     # Reusable UI components
lib/            # API clients, stores, helpers
api/            # Next.js Route Handlers
types/          # TypeScript types and interfaces
public/         # Static assets
```

The project follows a clear separation of concerns between UI components, business logic, API layer, and state management.

---

## 🔐 Authentication Flow

- Authentication is handled via **HTTP-only cookies**
- Session validation works in both **SSR and CSR**
- Protected routes redirect unauthorized users
- Auth state is synchronized using Zustand and TanStack Query

This approach reflects common real-world authentication patterns in modern web applications.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

---

## ▶️ Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

---

## 🎯 Purpose

This project was created as a **portfolio and educational application** to practice:
- Modern Next.js App Router patterns
- Authentication flows
- State management
- Scalable frontend architecture

---

## 📌 Planned Improvements

- Improved error handling
- UI/UX refinements
- Additional tests
- Performance optimizations
