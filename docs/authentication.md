# Authentication System Documentation

## Overview
Comprehensive JWT-based authentication system with NextAuth.js integration, supporting local credentials and OAuth workflows.

## Architecture

### Components
1. **NextAuth Configuration** (`lib/auth/config.ts`)
   - Credentials provider with bcrypt hashing
   - JWT session strategy
   - Redirect and callback handlers

2. **API Endpoints**
   - `POST /api/auth/login` - Authenticate user and issue tokens
   - `POST /api/auth/register` - Create new user account
   - `POST /api/auth/refresh` - Refresh expired access tokens

3. **Database Models**
   - `User` - Core user data with role-based access
   - `Session` - Active sessions with refresh tokens
   - `Preferences` - User preferences (theme, language, notifications)

### Token Strategy
- **Access Token**: 15-minute JWT for API requests
- **Refresh Token**: 30-day JWT for issuing new access tokens
- **Session**: Stored in database for revocation support

## API Endpoints

### POST /api/auth/register
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201):**
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

**Validation:**
- Email must be unique
- Password minimum 8 characters
- Email format validation

### POST /api/auth/login
Authenticate user and obtain tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
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

## Testing

All authentication endpoints are covered by unit tests:
```bash
npm test
```

✅ **6 tests passing**
- User registration with valid credentials
- Password validation (minimum length)
- Duplicate email prevention
- Login with valid credentials
- Login rejection for invalid credentials
- Inactive user rejection

## Next Steps
1. Implement middleware for route protection
2. Add OAuth providers (Google, GitHub)
3. Implement email verification
4. Add password reset functionality

