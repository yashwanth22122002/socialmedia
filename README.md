# Social Media Backend API

This is a robust backend for a social media platform built with **Node.js**, **Express**, and **PostgreSQL**. It supports user authentication, post creation, feeds, likes, comments, and user following relationships.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)
- [Features](#features)

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

1.  **Node.js** (v14 or higher)
    *   Download: [https://nodejs.org/](https://nodejs.org/)
    *   Verify: Run `node -v` in your terminal.
2.  **PostgreSQL** (v12 or higher)
    *   Download: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
    *   Verify: Run `psql --version` in your terminal.
3.  **Postman** (for API testing)
    *   Download: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
4.  **pgAdmin 4** (Optional, for viewing database tables)
    *   Usually comes installed with PostgreSQL.

---

## 📥 Installation

1.  **Unzip the project** folder.
2.  Open your terminal (Command Prompt, PowerShell, or Terminal).
3.  Navigate to the project directory:
    ```bash
    cd "social media backend"
    ```
4.  Install the dependencies:
    ```bash
    npm install
    ```

---

## ⚙️ Configuration

1.  Create a new file named `.env` in the root directory (same level as `package.json`).
2.  Copy the contents below and paste them into `.env`:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=social_media_db
    DB_USER=postgres
    DB_PASSWORD=YOUR_ACTUAL_POSTGRES_PASSWORD
    JWT_SECRET=super_secret_key_change_this
    ```

3.  **CRITICAL STEP**: Replace `YOUR_ACTUAL_POSTGRES_PASSWORD` with the password you set when installing PostgreSQL.

---

## 🗄️ Database Setup

You need to create the database and tables before running the app.

### Step 1: Create the Database
1.  Open **pgAdmin 4** (or use the command line).
2.  Right-click on **Databases** -> **Create** -> **Database...**
3.  Name it: `social_media_db`
4.  Click **Save**.

### Step 2: Create Tables (Automated)
We have provided a script to automatically create all necessary tables (`users`, `posts`, `follows`, `likes`, `comments`).

1.  In your terminal (inside the project folder), run:
    ```bash
    npm run setup:db
    ```
2.  You should see the message:
    > "Database schema created successfully"
    > "Database setup completed successfully!"

---

## 🚀 Running the Server

1.  Start the server in development mode:
    ```bash
    npm run dev
    ```
2.  You should see:
    > "Server is running on port 3000"
    > "Connected to PostgreSQL database"

The API is now live at `http://localhost:3000`.

---

## 🧪 Testing with Postman

We have provided a **Postman Collection** to make testing easy.

### Step 1: Install & Open Postman
1.  Download and install Postman from the link in Prerequisites.
2.  Open the application.
3.  Skip sign-in if you wish (click "Skip and go to the app").

### Step 2: Import the Collection
1.  In Postman, click the **Import** button (top left).
2.  Drag and drop the file `docs/api-collection.json` (located in this project folder) into Postman.
3.  You will see a new collection named **"Social Media Backend API"** in the left sidebar.

### Step 3: Configure Environment
1.  Click on the collection name **"Social Media Backend API"**.
2.  Go to the **Variables** tab.
3.  Ensure `base_url` is set to `http://localhost:3000`.
4.  Click **Save** (Ctrl+S).

### Step 4: Test Authentication (Register & Login)
1.  Expand the **Authentication** folder in the sidebar.
2.  Click **Register User**.
3.  Click **Send**.
    *   *Success*: You get a `201 Created` response.
    *   *Note*: Copy the `token` string from the response body (starts with `eyJ...`).
4.  **Authorize Requests**:
    *   Click on the collection name **"Social Media Backend API"** again.
    *   Go to the **Authorization** tab.
    *   Select Type: **Bearer Token**.
    *   Paste the token you copied into the **Token** field.
    *   Click **Save**.

### Step 5: Test Features
Now you can run any request in the collection without manually adding the token every time.

*   **Create Post**: Go to `Posts` -> `Create Post` -> Click Send.
*   **Search User**: Go to `Users` -> `Search User` -> Click Send.
*   **Follow User**:
    1.  Register a second user (User B).
    2.  Use User B's token in the Authorization tab of the "Follow User" request.
    3.  Send request to `{{base_url}}/api/users/:id/follow`.
*   **Get Feed**: Go to `Posts` -> `Get Feed` -> Click Send.
*   **Like/Comment**: Use the requests in the `Likes` and `Comments` folders.

---

## 📂 Project Structure

```
social media backend/
├── docs/                   # Documentation & Postman Collection
├── scripts/                # Database setup scripts
├── sql/                    # SQL Schema files
├── src/
│   ├── controllers/        # Business logic (Auth, Posts, Likes, etc.)
│   ├── middleware/         # Auth middleware (JWT verification)
│   ├── models/             # Database queries
│   ├── routes/             # API Route definitions
│   ├── utils/              # Helpers (Logger, DB connection, Validation)
│   └── app.js              # App entry point
├── .env                    # Environment variables (Git ignored)
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

---

## ✨ Features Implemented

*   **User Authentication**: Register, Login, JWT-based protection.
*   **User Profiles**: Search users, view profiles.
*   **Social Graph**: Follow and Unfollow users.
*   **Content**: Create text/media posts, delete posts.
*   **Feed**: Personalized feed showing posts from followed users.
*   **Interactions**: Like posts, Comment on posts.
*   **Stats**: View like and comment counts.

---

## 📧 Submission Details

*   **Database Schema**: See `sql/schema.sql`
*   **ER Diagram**: See `docs/er-diagram.mermaid`
*   **API Docs**: See `docs/api-collection.json`

For any questions, please contact the developer.
