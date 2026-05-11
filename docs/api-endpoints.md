# API Endpoints Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require Bearer token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### POST /auth/register
Create a new user account.

**Access**: Public

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response** (201):
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

**Validation**:
- Email must be unique
- Password minimum 8 characters
- Email format validation

---

### POST /auth/login
Authenticate user and obtain tokens.

**Access**: Public

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

**Error Responses**:
- `401`: Invalid credentials
- `403`: Account inactive

---

### POST /auth/refresh
Get a new access token using refresh token.

**Access**: Public

**Request**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses**:
- `400`: Missing refresh token
- `401`: Invalid or expired refresh token

---

### POST /auth/logout
Revoke the current session.

**Access**: Protected

**Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

---

### POST /auth/change-password
Change user password.

**Access**: Protected

**Request**:
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

**Response** (200):
```json
{
  "message": "Password changed successfully"
}
```

**Validation**:
- New password minimum 8 characters
- New password must differ from current password

---

## User Endpoints

### GET /users/profile
Get current user profile.

**Access**: Protected (User)

**Response** (200):
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg",
    "role": "USER",
    "is_active": true,
    "created_at": "2025-05-11T10:00:00Z",
    "preferences": {
      "id": "pref-123",
      "theme": "light",
      "language": "en",
      "email_notifications": true,
      "push_notifications": true
    }
  }
}
```

---

### PUT /users/profile
Update current user profile.

**Access**: Protected (User)

**Request**:
```json
{
  "name": "Jane Doe",
  "avatar_url": "https://example.com/new-avatar.jpg"
}
```

**Response** (200):
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "Jane Doe",
    "avatar_url": "https://example.com/new-avatar.jpg",
    "role": "USER"
  }
}
```

---

### GET /users/preferences
Get user preferences.

**Access**: Protected (User)

**Response** (200):
```json
{
  "preferences": {
    "id": "pref-123",
    "user_id": "user-123",
    "theme": "light",
    "language": "en",
    "email_notifications": true,
    "push_notifications": true,
    "updated_at": "2025-05-11T10:00:00Z"
  }
}
```

---

### PUT /users/preferences
Update user preferences.

**Access**: Protected (User)

**Request**:
```json
{
  "theme": "dark",
  "language": "es",
  "email_notifications": false,
  "push_notifications": true
}
```

**Response** (200):
```json
{
  "preferences": {
    "id": "pref-123",
    "theme": "dark",
    "language": "es",
    "email_notifications": false,
    "push_notifications": true
  }
}
```

---

### GET /users/activity
Get user activity log.

**Access**: Protected (User)

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)

**Response** (200):
```json
{
  "activities": [
    {
      "id": "activity-123",
      "user_id": "user-123",
      "event_type": "page_view",
      "event_data": { "page": "/dashboard" },
      "created_at": "2025-05-11T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

---

### POST /users/activity
Log user activity.

**Access**: Protected (User)

**Request**:
```json
{
  "event_type": "page_view",
  "event_data": {
    "page": "/dashboard",
    "duration_ms": 1234
  }
}
```

**Response** (201):
```json
{
  "activity": {
    "id": "activity-123",
    "user_id": "user-123",
    "event_type": "page_view",
    "event_data": { "page": "/dashboard", "duration_ms": 1234 },
    "created_at": "2025-05-11T10:00:00Z"
  }
}
```

---

## Admin Endpoints

### GET /users
List all users (paginated).

**Access**: Protected (Admin only)

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)

**Response** (200):
```json
{
  "users": [
    {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "is_active": true,
      "created_at": "2025-05-11T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "pages": 5
  }
}
```

---

### GET /users/:id
Get user by ID.

**Access**: Protected (User can access own, Admin can access any)

**Response** (200):
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg",
    "role": "USER",
    "is_active": true,
    "created_at": "2025-05-11T10:00:00Z"
  }
}
```

---

### PUT /users/:id
Update user (Admin only).

**Access**: Protected (Admin only)

**Request**:
```json
{
  "name": "Jane Doe",
  "role": "MODERATOR",
  "is_active": true
}
```

**Response** (200):
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "Jane Doe",
    "role": "MODERATOR",
    "is_active": true
  }
}
```

**Notes**:
- Cannot downgrade self from admin
- Available roles: USER, ADMIN, MODERATOR

---

### DELETE /users/:id
Deactivate user (Admin only).

**Access**: Protected (Admin only)

**Response** (200):
```json
{
  "message": "User deactivated",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "is_active": false
  }
}
```

**Notes**:
- Cannot delete yourself
- User is deactivated, not permanently deleted

---

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Email and password are required"
}
```

### 401 - Unauthorized
```json
{
  "error": "Unauthorized - Invalid or missing token"
}
```

### 403 - Forbidden
```json
{
  "error": "Forbidden - Admin access required"
}
```

### 404 - Not Found
```json
{
  "error": "User not found"
}
```

### 409 - Conflict
```json
{
  "error": "User with this email already exists"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Common Headers

**Request Headers**:
```
Content-Type: application/json
Authorization: Bearer <access_token>
```

**Response Headers**:
```
Content-Type: application/json
```

---

## Rate Limiting
Current implementation has no rate limiting. This will be added in a future version.

---

## Pagination
Endpoints that return lists use cursor-based pagination:

**Query Parameters**:
- `page`: Page number (1-indexed)
- `limit`: Results per page

**Response**:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

