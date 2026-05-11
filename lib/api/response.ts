import { NextResponse } from 'next/server'
import { ApiError } from './errors'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status },
  )
}

export function listResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  status = 200,
) {
  return NextResponse.json(
    {
      data,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        timestamp: new Date().toISOString(),
      },
    },
    { status },
  )
}

export function errorResponse(error: unknown) {
  console.error('[API Error]', error)

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: error.status },
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: error.message || 'Internal server error',
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }

  return NextResponse.json(
    {
      error: 'Internal server error',
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: 500 },
  )
}
