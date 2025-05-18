# Blog-Node.js

A full-featured blogging platform built with Node.js, Express.js, MongoDB, and EJS. The application allows administrators to manage blog content securely with a complete authentication system based on JSON Web Tokens (JWT).

## 📌 Project Overview

Blog-Node.js is a secure CRUD-based web application that enables authorized administrators to create, read, update, and delete blog posts. It demonstrates how to build scalable and modular Express.js applications using the MVC architecture, clean routing, and secure authentication.

This project is ideal for learning core backend concepts like routing, middleware, authentication, and database modeling using MongoDB with Mongoose.

## ✨ Key Features

- Full authentication system using JWT (JSON Web Tokens)
- Protected admin routes for content management
- Role-based access control (admin vs general user)
- Create, edit, and delete blog posts
- View all posts or individual post details
- Secure login and token-based authorization
- Clean and responsive UI with EJS templates
- Organized project structure for scalability and maintainability

## 🔐 Authentication & Authorization

The application uses **JWT (JSON Web Tokens)** to manage secure user sessions. Admin credentials are verified, and a signed token is generated on login. This token is used to authenticate and authorize users across protected routes.

Key authentication features include:

- JWT-based login system
- Token storage and verification middleware
- Access control to admin-only routes
- Clean separation of public and private areas in the app

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Templating:** EJS
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Utilities:** dotenv for environment management, Express middleware

## 👨‍💻 Author

**Nawras Alkhrissat** – [GitHub Profile](https://github.com/NawrasAlkhrissat)
