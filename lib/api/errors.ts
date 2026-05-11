export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Not found') {
    super(message, 404)
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Conflict') {
    super(message, 409)
  }
}

export class ValidationError extends ApiError {
  constructor(
    public details: unknown[],
    message: string = 'Validation error',
  ) {
    super(message, 400)
  }
}
