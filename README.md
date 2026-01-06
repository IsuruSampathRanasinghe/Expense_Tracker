# Expense Tracker

A full-stack Expense Tracker application with user authentication, expense & income management, charts and CSV/XLSX export support.

## Features

- User authentication (signup / login / JWT)
- Track expenses and incomes with categories, notes and attachments
- CSV / XLSX export of transactions
- Interactive charts and summary dashboards
- Profile upload handling

## Tech Stack

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React (Vite), Tailwind CSS, Recharts
- Auth: JSON Web Tokens (JWT)
- File uploads: Multer

## Repo Structure

- backend/ — Express API server
- frontend/ — React + Vite client
- uploads/ — uploaded files (images, attachments)

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or hosted)

## Environment

Create a `.env` file in `backend/` with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=your_jwt_secret_here
```

Adjust values as needed for your environment.

## Backend — Install & Run

Open a terminal in the `backend/` folder and run:

```bash
npm install
# development (auto-restarts with nodemon)
npm run dev
# or production
npm start
```

Available backend scripts (from `backend/package.json`):

- `start` — runs `node server.js`
- `dev` — runs `nodemon server.js` (development)

The backend listens on the port defined in `PORT` (defaults to 5000).

## Frontend — Install & Run

Open a terminal in the `frontend/` folder and run:

```bash
npm install
npm run dev
```

Available frontend scripts (from `frontend/package.json`):

- `dev` — starts Vite development server
- `build` — builds production bundle
- `preview` — previews production build
- `lint` — runs ESLint

The React app runs on the port provided by Vite (usually 5173).

## Uploads

User-uploaded files are stored in the `backend/uploads/` directory (ensure write access).

## API Overview

The backend exposes routes for authentication, expenses, incomes and dashboard summaries. See the `backend/routes/` folder for available endpoints and expected request formats.

Key routes:

- `POST /auth/signup` — register user
- `POST /auth/login` — login user
- `GET /dashboard` — fetch dashboard summaries (authenticated)
- `GET/POST/PUT/DELETE /expenses` — manage expenses (authenticated)
- `GET/POST/PUT/DELETE /incomes` — manage incomes (authenticated)

Use a tool like Postman or the frontend UI to exercise the API.

## Development Tips

- Keep backend and frontend running in separate terminals while developing.
- Set `CORS` origin in backend if serving frontend from a different host/port.
- Use `nodemon` to auto-restart the server on backend file changes.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Open a pull request with a description of changes

Please run linting and basic tests (if any) before submitting PRs.

## License

This project is provided as-is. Add a license file if you intend to open-source it.
