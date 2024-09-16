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

## License
    
```plaintext
This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
```