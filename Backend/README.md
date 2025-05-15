# User Registration API Documentation

## Endpoint

`POST /users/register`

---

## Description

This endpoint allows a new user to register by providing their full name, email, and password. The server validates the input, hashes the password, and creates a new user in the database. On success, it returns a JWT token and the created user object.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required, min 3 characters)
- `fullname.lastname` (string, optional, min 3 characters if provided)
- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 characters)

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
      // ...
    ]
  }
  ```

---

## Example Request

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "securepassword"
  }'
```

---

## Notes

- The password is securely hashed before storage.
- On success, a JWT token is returned for authentication in future requests.
- Make sure your request body matches the required structure for successful registration.

---

# User Login API Documentation

## Endpoint

`POST /users/login`

---

## Description

This endpoint allows an existing user to log in by providing their email and password. If the credentials are valid, a JWT token and the user object are returned.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 characters)

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body Example:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body Example:**
  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email address",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body Example:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## Example Request

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Notes

- On success, a JWT token is returned for authentication in future requests.
- Make sure your request body matches the required structure for successful login.

---

# Captain Registration API Documentation

## Endpoint

`POST /captains/register`

---

## Description

This endpoint allows a new captain to register by providing their personal information and vehicle details. The server validates the input, hashes the password, and creates a new captain account in the database.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field Requirements

#### Personal Information
- `fullname.firstname` (string, required, min 3 characters)
- `fullname.lastname` (string, optional, min 3 characters if provided)
- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 characters)

#### Vehicle Information
- `vehicle.color` (string, required, min 3 characters)
- `vehicle.plate` (string, required, min 3 characters)
- `vehicle.capacity` (number, required)
- `vehicle.vehicleType` (string, required, must be one of: 'car', 'motorcycle', 'auto')

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body Example:**
  ```json
  {
    "token": "<jwt_token>",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.captain@example.com",
      "vehicle": {
        "color": "Black",
        "plate": "ABC-123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body Example:**
  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email address",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Vehicle type must be either car, motorcycle, or auto",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

### Duplicate Email Error

- **Status Code:** `400 Bad Request`
- **Body Example:**
  ```json
  {
    "message": "Captain with this email already exists"
  }
  ```

---

## Example Request

```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "password": "securepassword",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

## Notes

- The password is securely hashed before storage
- All vehicle information is required and must meet the specified validation rules
- Vehicle type must be one of the predefined options: 'car', 'motorcycle', 'auto'
- The email address must be unique across all captain accounts

---

# User Profile API Documentation

## Endpoint

`GET /users/profile`

---

## Description

This endpoint retrieves the profile information of the currently authenticated user. It requires a valid JWT token to be included in the request.

---

## Authentication

Include the JWT token in one of these ways:
- As a cookie named 'token'
- In the Authorization header: `Bearer <token>`

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body Example:**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body Example:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## Example Request

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

# User Logout API Documentation

## Endpoint

`GET /users/logout`

---

## Description

This endpoint logs out the currently authenticated user by invalidating their JWT token. The token is added to a blacklist to prevent future use.

---

## Authentication

Include the JWT token in one of these ways:
- As a cookie named 'token'
- In the Authorization header: `Bearer <token>`

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body Example:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body Example:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## Example Request

```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Notes

- After logout, the token is blacklisted and cannot be used for future requests
- The token cookie (if present) is cleared from the client
- Any subsequent requests with the same token will receive a 401 Unauthorized response

