# WatchNext Frontend

The user-facing client application for **WatchNext**, built to interact seamlessly with the NestJS and CognoDB backend architecture.

## Features

* **Interactive UI/UX**: Clean layout and navigation for exploring movies, categories, and recommendations.
* **Authentication Flows**: Secure login and registration forms integrated with backend JWT endpoints.
* **Dynamic Content Explorer**: Structured views for browsing movies, titles, and relational data connections.

## Setup and Run Instructions

### Prerequisites

* Node.js (v18+ recommended)

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Mohamed-Khaled-Hub/watchnext-frontend.git
cd watchnext-frontend
npm install

```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000

```

*(Or point to your hosted backend URL if deployed).*

### 3. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Live Demo

* **Hosted Website**: [WatchNext Live Demo](https://watchnext-frontend-three.vercel.app)