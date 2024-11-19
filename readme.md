# Task System Task MERN

contains a client and a server folder for both frontend and backend apps.

# Pre-requisites

    Nodejs v18.x
    Postgres installed on your OS
    Do not forget to rename migration file to ".mjs"

# Server Setup

    Add following env variables to the .env file:
    JWT_TOKEN_SECRET
    SERVER_PORT
    PG_USERNAME
    PG_PASSWORD
    PG_DB
    PG_PORT

# Run Dev Server

npm run dev

# Server API endpoints

    - Register User
    POST /api/auth/create-user
    JSON payload :
    {name:'name',email:'e@mail.com',password:'somepassword'}
    sampe response:
    {
    "data": {
        "success": true,
        "message": "User created!"
        }
    }

    - Login
    POST /api/auth/login
    JSON payload :
    {email:'e@mail.com',password:'somepassword'}
    sample response:
    {
    "data": {
        "id": 15,
        "name": "bilal",
        "email": "user@mail.com",
        "createdAt": "2024-11-19T16:40:07.954Z",
        "updatedAt": "2024-11-19T16:40:07.954Z",
        "token":"JWT Token"
        }
    }

    - Tasks
    A task List
    GET /api/secure/tasks/list

    Create a task
    POST /api/secure/tasks/create
    payload:
    JSON
    title,description,status='pending'|'in_progress'|'compleded', priority='low'|'medium'|'high'

    Update a task
    PATCH /api/secure/tasks/update/12
    JSON Payload:
    parital of the task create payload

    Delete a task
    DELETE /api/secure/tasks/delete/12

# Client App Setup

    - Add .env file and add a variable VITE_API_BASE_URL
    e.g 'http://localhost:4000/api'

# Run dev server

run npm run dev in terminal.

# Client app pages

    - Register
    /auth/register
    - Login
    /auth/login
    - Tasks list
    /tasks
    - Create Task
    tasks/create
