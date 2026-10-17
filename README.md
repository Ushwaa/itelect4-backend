# ITELECT4 Backend

This project provides the backend API for the ITELECT4 frontend. It uses Express, TypeScript, Mongoose, and JWT authentication.

## Tech stack

- Node.js + Express
- TypeScript (strict mode)
- MongoDB Atlas + Mongoose
- JWT authentication
- bcryptjs password hashing
- dotenv environment variables
- CORS for frontend communication

## Project structure

- `src/app.ts` - Express app configuration
- `src/server.ts` - server startup
- `src/config/db.ts` - MongoDB connection setup
- `src/models/` - Mongoose models for User and Submission
- `src/controllers/` - auth and submission logic
- `src/routes/` - endpoint registration
- `src/middleware/` - JWT protection and error handling
- `src/types/` - shared request/user types

## Local setup

1. Create a `.env` file from `.env.example`.
2. Replace the placeholder values with your MongoDB Atlas URI and JWT secret.
3. Install dependencies:

```bash
npm install
```

4. Start the API in development mode:

```bash
npm run dev
```

5. The server listens on `http://localhost:4000` by default.

## Required environment variables

Create a `.env` file with:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_very_strong_secret_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

> Do not commit or share the real `.env` file. The repository ignores it.

## Authentication endpoints

### 1) Register

`POST /api/auth/register`

Request body:

```json
{
  "username": "student01",
  "email": "student01@example.com",
  "password": "Password123!"
}
```

Expected responses:

- `201 Created` for a successful registration
- `400 Bad Request` for invalid input
- `409 Conflict` if username or email is already in use

### 2) Login

`POST /api/auth/login`

Request body:

```json
{
  "email": "student01@example.com",
  "password": "Password123!"
}
```

Expected responses:

- `200 OK` with a JWT token and user data
- `400 Bad Request` for invalid payload
- `401 Unauthorized` for bad credentials

## Submission resource endpoints

All Submission routes require a valid JWT in the header:

```http
Authorization: Bearer <token>
```

### Get all submissions

`GET /api/submissions`

### Get one submission by ID

`GET /api/submissions/:id`

### Create a submission

`POST /api/submissions`

Request body:

```json
{
  "studentId": 1,
  "courseCode": "ITELECT4",
  "repoUrl": "https://github.com/yourname/project",
  "submittedAt": "2026-10-17T12:00:00.000Z",
  "score": 0
}
```

### Update a submission

`PATCH /api/submissions/:id`

Example:

```json
{
  "score": 95
}
```

### Delete a submission

`DELETE /api/submissions/:id`

Expected responses:

- `200 OK` or `204 No Content` depending on the route
- `400 Bad Request` for invalid MongoDB IDs or malformed payloads
- `401 Unauthorized` for missing or invalid JWT
- `404 Not Found` if the record does not exist
- `500 Internal Server Error` for unexpected failures

## Example Postman test flow

The following sequence is the expected validation flow for the project. These steps still need to be executed locally after you add your actual MongoDB Atlas connection string and JWT secret.

1. Start the backend:

```bash
npm run dev
```

2. Confirm the app listens on `http://localhost:4000`.

3. Register a user:

```http
POST http://localhost:4000/api/auth/register
Content-Type: application/json
```

Body:

```json
{
  "username": "student01",
  "email": "student01@example.com",
  "password": "Password123!"
}
```

Expected: `201 Created`

4. Register the same user again to confirm duplicates are rejected.

Expected: `409 Conflict`

5. Log in:

```http
POST http://localhost:4000/api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "student01@example.com",
  "password": "Password123!"
}
```

Expected: `200 OK` and a JWT token.

6. Test JWT protection without a token:

```http
GET http://localhost:4000/api/submissions
```

Expected: `401 Unauthorized`

7. Repeat the route with a valid token:

```http
GET http://localhost:4000/api/submissions
Authorization: Bearer <token>
```

Expected: `200 OK`

8. Create a submission:

```http
POST http://localhost:4000/api/submissions
Authorization: Bearer <token>
Content-Type: application/json
```

Body:

```json
{
  "studentId": 1,
  "courseCode": "ITELECT4",
  "repoUrl": "https://github.com/yourname/project",
  "submittedAt": "2026-10-17T12:00:00.000Z",
  "score": 0
}
```

Expected: `201 Created`

9. Retrieve all submissions.

Expected: `200 OK`

10. Retrieve the created submission by ID.

Expected: `200 OK`

11. Update the submission.

```http
PATCH http://localhost:4000/api/submissions/<id>
Authorization: Bearer <token>
Content-Type: application/json
```

Body:

```json
{
  "score": 95
}
```

Expected: `200 OK`

12. Delete the submission.

```http
DELETE http://localhost:4000/api/submissions/<id>
Authorization: Bearer <token>
```

Expected: `200 OK` or `204 No Content`

13. Verify invalid cases:

- invalid MongoDB ID -> `400 Bad Request`
- missing item -> `404 Not Found`
- malformed request body -> `400 Bad Request`
- invalid credentials -> `401 Unauthorized`

## Frontend integration notes

The frontend should send requests to `http://localhost:4000` and include a JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

The existing frontend project may currently use `json-server` on port `3001` for demo data, but the GT4 backend is designed to use the MongoDB-backed API instead. The backend and frontend remain independently runnable.

## Git and submission notes

This folder was not a valid Git repository when the backend project was initialized, so no Git branch or remote actions were created. The backend implementation is ready to be committed once the repository is initialized in the correct place.

## Verification status

- `npm run build` was run after implementation and is part of the project verification workflow.
- Postman and live MongoDB testing still require a valid Atlas connection string and a real JWT secret in a local `.env` file.
