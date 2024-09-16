# SyncSphere

SyncSphere is a project management application that allows users to create and manage workspaces. This repository contains the source code for both the client and server.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Starting the Application](#starting-the-application)
- [Folder Structure](#folder-structure)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for the backend)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/syncsphere.git
    cd syncsphere
    ```

2. Install dependencies for the client:

    ```bash
    cd client
    npm install
    ```

3. Install dependencies for the server:

    ```bash
    cd ../server
    npm install
    ```

## Environment Variables

Create a `.env` file in the root of the `server` directory and add the following environment variables:

```env
# .env file for the server

# Port number for the server
PORT=5000

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/syncsphere

# JWT secret key
JWT_SECRET=your_jwt_secret_key

# Frontend URL
FRONTEND=your_fronted_url
```

Create a .env file in the root of the client directory and add the following environment variables:

```env
# .env file for the client

# Backend URL
REACT_APP_BACKEND_URL=your_backend_url

```


## Starting the Application

1. Start the server:

    ```bash
    cd server
    npm start
    ```

2. Start the client:

    ```bash
    cd client
    npm start
    ```

## Folder Structure

The folder structure for the client and server is as follows:

```
syncsphere/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   ├── .env
│   ├── package.json
├── server/
│   ├── controllers/
│   ├── middleware.js
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   ├── package.json
├── LICENSE
├── README.md
```
## Features

### 1. User Registration and Login
- Users must first **register** using their email to create an account.
- Once registered, users can **log in** to access the platform.

### 2. Workspace Management
- After logging in, users can:
  - **Create a new workspace**.
  - **Join an existing workspace** using an **invitation token** from their team.

### 3. Workspace Features
Each workspace comes with a range of collaborative tools for efficient team management:

#### a. Task Management
- Users can **track tasks** assigned to everyone in the workspace.
- Task statuses, deadlines, and progress can be easily monitored.

#### b. Real-Time Chat System
- **End-to-end chat** functionality is available for all members within the workspace.
- Chat with team members to streamline communication without leaving the platform.

#### c. Collaborative Document Editor
- Work together on documents with the **collaborative editor**.
- **Download** the completed documents for offline access.

### 4. Invitations and Team Management
- Use the **Invitation section** to invite team members to your workspace.
- Share an **invitation token** to grant access to the workspace for your team.

#### Known Issue: Response Latency with Socket on Render

Due to time constraints, the backend of the platform has been **deployed on Render** instead of AWS. While this allowed us to quickly get the platform up and running, we are experiencing some response latency, particularly with the real-time **Socket.io** functionality.
To avoid issues, users are advised to **type a little slower** when using SyncSphere.

## Tech Stack

- **Frontend**: React.js, CSS, HTML, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render (for backend), Netlify (for frontend)

## Deployed Application

You can access the deployed application [here](https://syncsphere.netlify.app/).


## License
    
```plaintext
This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
```
