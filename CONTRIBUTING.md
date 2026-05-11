# Contributing Guide

## Development Workflow

### 1. Branch Naming
- Feature: `feature/short-description`
- Bug fix: `fix/short-description`
- Refactor: `refactor/short-description`
- Docs: `docs/short-description`

### 2. Code Standards

#### TypeScript
- Use strict mode (`strict: true` in tsconfig.json)
- Define types explicitly
- Avoid `any` type

#### ESLint & Prettier
```bash
npm run lint:fix
```

#### API Design
Follow REST conventions (see [ADR-003](/docs/architecture/ADR-003-api-design.md)):
- `GET /api/v1/resource` - List
- `POST /api/v1/resource` - Create
- `GET /api/v1/resource/:id` - Get
- `PATCH /api/v1/resource/:id` - Update
- `DELETE /api/v1/resource/:id` - Delete

### 3. Database Changes

When modifying the schema:

```bash
# Create migration
npx prisma migrate dev --name descriptive_name

# Review the migration file
# Commit the migration

# Test locally
npx prisma migrate reset
```

### 4. Testing

Write tests for:
- API endpoints (Jest)
- Database operations (Prisma)
- Utility functions
- Authentication flows

```bash
npm run test
npm run test:coverage
```

Target: 80% code coverage

### 5. Commit Messages

Format:
```
type(scope): subject

Body (optional)
- Feature details
- Breaking changes
```

Examples:
- `feat(auth): add JWT refresh token logic`
- `fix(api): handle missing pagination params`
- `docs(db): update schema documentation`

### 6. Pull Request Process

1. **Create PR** from your branch to `develop`
2. **Fill PR template** with description and checklist
3. **Request review** from maintainers
4. **Address feedback** and push updates
5. **Merge** when approved and CI passes

#### PR Checklist
- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Database migrations included
- [ ] Documentation updated
- [ ] No console.log statements (except errors)
- [ ] Breaking changes documented

### 7. Code Review Guidelines

When reviewing:
- Check for security issues
- Verify tests are adequate
- Confirm API design follows REST
- Look for performance issues
- Ensure error handling is proper

## Project Structure

```
app/
├── api/v1/           # API routes (organize by feature)
├── layout.tsx        # Root layout
└── page.tsx          # Home page

lib/
├── api/              # API utilities
├── auth/             # Authentication
├── prisma/           # Database client
└── validation/       # Zod schemas

prisma/
├── schema.prisma     # Database schema
└── migrations/       # Migration files
```

## Common Tasks

### Adding New Endpoint

1. Create folder: `app/api/v1/resource/action/`
2. Create file: `route.ts`
3. Define request handler
4. Add validation schema in `lib/validation/`
5. Write tests in `__tests__/`
6. Document in README

### Adding Database Model

1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name add_model`
3. Review migration file
4. Test with `npx prisma db push`
5. Update API endpoints if needed

### Adding Authentication

Use NextAuth.js v5 pattern:
```typescript
import { auth } from '@/lib/auth'

async function protectedRoute() {
  const session = await auth()
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }
}
```

## Debugging

### Database Debugging
```bash
npx prisma studio  # Open Prisma Studio
```

### API Testing
Use Postman or curl:
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","password":"password123"}'
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Performance Tips

1. **Database**
   - Use indexes for frequently queried fields
   - Use `select()` to limit returned fields
   - Use `include()` instead of N+1 queries

2. **API**
   - Implement pagination (default: 20 items)
   - Use response caching headers
   - Compress large responses

3. **Frontend**
   - Code split with dynamic imports
   - Use Image component for optimization
   - Lazy load components

## Security Checklist

- [ ] No secrets in code (use env variables)
- [ ] Validate all inputs (Zod schemas)
- [ ] Hash passwords (bcryptjs)
- [ ] Use HTTPS in production
- [ ] Set secure headers (CORS, CSP)
- [ ] Rate limit public endpoints
- [ ] Log security events

## Getting Help

- Check [ADRs](/docs/architecture/)
- Review existing code
- Ask in team chat
- Open a GitHub discussion

---

**Last Updated**: 2025-05-10
