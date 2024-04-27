# Book Management API

This Book Management API allows users to create, update, search, and delete books. It features user authentication, book CRUD operations, flexible search capabilities, and JWT-based authentication for security.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Example Requests](#example-requests)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [License](#license)

## Features
- User authentication with JWT-based token generation.
- Create, read, update, and delete operations for books.
- Search functionality based on title, author, and publication year.
- Secure API with authorization checks for sensitive operations.
- Proper error handling and input validation.

## Prerequisites
- Node.js (version 12 or later recommended).
- MongoDB (local or remote database).
- npm (Node Package Manager).

## Setup and Installation
1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>

2. Install dependencies
   npm install

3. Set up environment variables
   MONGO_URI=mongodb://localhost:27017/book-management
   JWT_SECRET=your-jwt-secret
   PORT=5000

4. To start the server, use the following command:
   npm start
