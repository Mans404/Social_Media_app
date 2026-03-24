# Social Media Application

A RESTful API built with **Node.js**, **TypeScript**, and **Express**, backed by a **PostgreSQL** database. The API supports full CRUD operations for Users, Posts, Comments, and Actions — following a clean layered architecture (Controller → Repository → DbService).


## Goal of Project

Build a production-ready REST API that:

- Manages **Users**, **Posts**, **Comments**, and **Actions** (like / dislike / save)
- Enforces **data validation** at the route level before hitting the database
- Follows a clean **layered architecture** that separates concerns (routing → controller → repository → database)
- Uses **code-first** database initialization — tables and constraints are created automatically on startup
- Ships with a **HTML dashboard** to browse API responses visually

---

## Project Structure

```
smart-code-module/
├── .devcontainer/
│   ├── Dockerfile                  # Container image for the app
│   ├── devcontainer.json           # VS Code dev container config
│   └── docker-compose.yml          # App + PostgreSQL services
│
├── .vscode/
│   ├── extensions.json             # Recommended extensions
│   ├── settings.json               # Workspace settings
│   └── tasks.json                  # Build / run tasks
│
├── src/
│   ├── controllers/
│   │   ├── ActionController.ts     # Handles HTTP req/res for actions
│   │   ├── CommentController.ts
│   │   ├── PostController.ts
│   │   └── UserController.ts
│   │
│   ├── models/
│   │   ├── Action.ts               # Data shape / TypeScript class
│   │   ├── Comment.ts
│   │   ├── Post.ts
│   │   └── User.ts
│   │
│   ├── repositories/
│   │   ├── ActionRepository.ts     # SQL queries, returns model instances
│   │   ├── CommentRepository.ts
│   │   ├── PostRepository.ts
│   │   └── UserRepository.ts
│   │
│   ├── routes/
│   │   └── index.ts                # All route definitions + validator wiring
│   │
│   ├── services/
│   │   └── DbService.ts            # Singleton pg connection pool
│   │
│   ├── validators/
│   │   ├── actionValidator.ts      # Middleware — validates req.body
│   │   ├── commentValidator.ts
│   │   ├── postValidator.ts
│   │   └── userValidator.ts
│   │
│   ├── main.ts                     # Entry point — bootstrap
│   └── Server.ts                   # Express app setup
│
├── .env                            # Secret keys (not committed)
├── .env.example                    # Template for environment variables
├── .gitignore
├── package.json
└── tsconfig.json
```

### Architecture Flow

```
Request → index.ts (routes) → Validator Middleware
       → Controller → Repository → DbService → PostgreSQL
       → Repository maps rows to Model → Controller sends response
```

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **TypeScript** | Type safety across the entire codebase |
| **Express.js** | HTTP server and routing |
| **PostgreSQL** | Relational database |
| **node-postgres (pg)** | PostgreSQL client for Node.js |
| **dotenv** | Environment variable management |

---

## Setup Instructions

### Option A — Docker (Recommended)

The easiest way to run the project. Docker handles Node.js, PostgreSQL, and all dependencies automatically.

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

#### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

#### 2. Configure environment variables

```bash
cp .env.example .env
```

Then edit `.env` — make sure these match the values in `docker-compose.yml`:

```env
DB_HOST=db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
PORT=3000
```

> `DB_HOST` must be `db` (the Docker service name), not `localhost`

#### 3. Open in VS Code Dev Container

If you use VS Code, simply:
- Open the project folder
- Press `Ctrl+Shift+P` → **Dev Containers: Reopen in Container**
- VS Code will build the container and set everything up automatically

---

### Option B — Local Setup

**Prerequisites:**
- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher
- npm

#### 1. Clone the repository

```bash
git clone https://github.com/Mans404/Social_Media_app.git
cd Social_Media_app
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure environment variables

```bash
cp .env.example .env
```

Then edit `.env`:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
PORT=8080
```

#### 4. Create the database

In your PostgreSQL client:

```sql
CREATE DATABASE your_db_name;
```

> Tables and ENUMs are created **automatically** on first run — no migration files needed.

---

## Running the Application

### With Docker

```bash
docker compose up
```

To run in the background:

```bash
docker compose up -d
```

To stop:

```bash
docker compose down
```

### Without Docker (Local)

```bash
npm run dev
```

---

On startup you will see:

```
✅ Tables initialized successfully
🚀 Server running on port 3000
```

### Seed dummy users (optional)

```bash
npm run seed:users
```

---

## API Reference

Base URL: `http://localhost:3000`

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Get all users |
| `GET` | `/users/:id` | Get user by ID |
| `POST` | `/users` | Create a new user |
| `PUT` | `/users/:id` | Update a user |
| `DELETE` | `/users/:id` | Delete a user |

**POST /users — request body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
```

---

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/posts` | Get all posts |
| `GET` | `/posts/:id` | Get post by ID |
| `GET` | `/posts/user/:userid` | Get posts by user |
| `POST` | `/posts` | Create a new post |
| `PUT` | `/posts/:id` | Update a post |
| `DELETE` | `/posts/:id` | Delete a post |

**POST /posts — request body:**
```json
{
  "title": "My First Post",
  "userid": 1,
  "content": "Hello world",
  "type": "text"
}
```

> `type` must be `"text"` or `"video"`

---

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/comments` | Get all comments |
| `GET` | `/comments/:id` | Get comment by ID |
| `GET` | `/comments/post/:postid` | Get comments by post |
| `GET` | `/comments/user/:userid` | Get comments by user |
| `POST` | `/comments` | Create a new comment |
| `PUT` | `/comments/:id` | Update a comment |
| `DELETE` | `/comments/:id` | Delete a comment |

**POST /comments — request body:**
```json
{
  "content": "Great post!",
  "userid": 1,
  "postid": 5
}
```

---

### Actions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/actions` | Get all actions |
| `GET` | `/actions/:id` | Get action by ID |
| `GET` | `/actions/user/:userid` | Get actions by user |
| `GET` | `/actions/post/:postid` | Get actions by post |
| `GET` | `/actions/comment/:commentid` | Get actions by comment |
| `POST` | `/actions` | Create a new action |
| `PUT` | `/actions/:id` | Update an action |
| `DELETE` | `/actions/:id` | Delete an action |

**POST /actions — request body:**
```json
{
  "type": "like",
  "userid": 1,
  "postid": 3
}
```

> `type` must be `"like"`, `"dislike"`, or `"save"`  
> Provide **either** `postid` or `commentid` — not both

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_USER` | PostgreSQL username | `user` |
| `DB_PASSWORD` | PostgreSQL password | `password` |
| `DB_NAME` | Database name | `mydb` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `PORT` | Server port | `3000` |

---

## What Could Be Added Next

- **Authentication** — JWT-based login and protected routes
- **Pagination** — `?page=1&limit=10` query params on list endpoints
- **Search & filtering** — filter posts by type, actions by type, etc.
- **Indexing**
- **Unit & integration tests** — Jest + Supertest
- **Docker support** — `docker-compose.yml` for one-command setup
- **Rate limiting** — protect the API from abuse
