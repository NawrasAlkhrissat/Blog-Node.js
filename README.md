# Blog-Node.js — Fully Detailed Project Documentation

## Table of Contents
1. [Project Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Installation and Setup](#installation-and-setup)
5. [Configuration](#configuration)
6. [Core Concepts](#core-concepts)
7. [API Documentation](#api-documentation)
8. [Authentication & Security](#authentication--security)
9. [Error Handling](#error-handling)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Contribution Guidelines](#contribution-guidelines)
13. [FAQ](#faq)
14. [License](#license)
15. [Contact](#contact)

---

## 1. Project Overview
Blog-Node.js is a Node.js-based blogging platform featuring user authentication, CRUD operations for posts and comments, and a RESTful API.

## 2. Technology Stack
- **Node.js** (Express.js)
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables

## 3. Folder Structure
```
Blog-Node.js/
│
├── app.js             # Main application entry point
├── package.json
├── routes/            # Express route definitions
├── controllers/       # Business logic for each route
├── models/            # Mongoose database models
├── middleware/        # Custom Express middlewares
├── config/            # Configuration files (e.g., DB, JWT)
├── utils/             # Helper and utility functions
└── README.md
```

## 4. Installation and Setup

### Prerequisites
- Node.js (>=14)
- MongoDB

### Steps
1. Clone the repo
   ```bash
   git clone https://github.com/NawrasAlkhrissat/Blog-Node.js.git
   cd Blog-Node.js
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blog
   JWT_SECRET=your_jwt_secret
   ```
4. Start the app:
   ```bash
   npm start
   ```

## 5. Configuration
| Variable      | Description                   |
|---------------|-------------------------------|
| PORT          | Server port                   |
| MONGODB_URI   | MongoDB connection string     |
| JWT_SECRET    | JWT signing secret            |

## 6. Core Concepts

### 6.1 Models
- **User Model:** email, password (hashed), username, roles
- **Post Model:** title, content, author, timestamps
- **Comment Model:** content, author, post, timestamps

### 6.2 Controllers
- Handle business logic for each route (e.g., createPost, getPosts)
- Validate data and interact with models

### 6.3 Routes
- **/api/auth** — Registration and login
- **/api/posts** — CRUD for blog posts
- **/api/comments** — CRUD for comments

### 6.4 Middleware
- **authMiddleware:** Protects authenticated routes using JWT
- **errorMiddleware:** Handles errors globally

## 7. API Documentation

### Authentication
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login, returns JWT

### Posts
- `GET /api/posts` — List posts (public)
- `GET /api/posts/:id` — Get single post
- `POST /api/posts` — Create post (auth required)
- `PUT /api/posts/:id` — Update post (owner only)
- `DELETE /api/posts/:id` — Delete post (owner only)

### Comments
- `GET /api/posts/:id/comments` — List comments on a post
- `POST /api/posts/:id/comments` — Comment on a post (auth required)

### Example API Response

```json
{
  "success": true,
  "data": {
    "id": "123",
    "title": "First Post",
    "content": "Hello world!",
    "author": "NawrasAlkhrissat"
  }
}
```

## 8. Authentication & Security

- Passwords are hashed with bcrypt before storage.
- JWTs are used to secure private routes.
- Only the owner or admin can edit/delete posts.
- Sensitive routes are protected using middleware.

## 9. Error Handling

- Centralized error handler in middleware.
- Consistent error response format:
```json
{
  "success": false,
  "message": "Error message"
}
```

## 15. Contact

For support, contact [NawrasAlkhrissat](https://github.com/NawrasAlkhrissat).

---

## Appendices

### Example .env File

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret
```

### Example MongoDB Schema

```js
// User model example
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // hashed
  roles: [String]
});
```

