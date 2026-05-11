# Enterprise App

Enterprise-grade SaaS application built with Next.js, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd enterprise-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Set up database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
enterprise-app/
├── app/                    # Next.js App Router
│   ├── api/v1/            # API endpoints
│   │   ├── auth/          # Authentication
│   │   └── users/         # User management
│   ├── layout.tsx
│   └── page.tsx
├── lib/                    # Utilities & business logic
│   ├── api/               # API helpers
│   ├── auth/              # Auth logic
│   ├── prisma/            # Prisma client
│   └── validation/        # Zod schemas
├── components/            # React components
├── prisma/                # Database schema & migrations
├── middleware/            # Express-style middleware
├── types/                 # TypeScript types
├── .github/workflows/     # CI/CD pipelines
└── package.json
```

## 📚 Architecture

### Technology Stack
- **Frontend**: Next.js 15.2, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Validation**: Zod
- **Monitoring**: Sentry

### API Endpoints

**Authentication**
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user

**Users**
- `GET /api/v1/users` - List users (paginated)
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## 🔐 Security

- JWT authentication with refresh token rotation
- Password hashing (bcryptjs)
- CSRF protection
- SQL injection prevention (Prisma ORM)
- Rate limiting (Upstash)
- CORS configuration
- Environment variable management

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- auth.test.ts

# Generate coverage report
npm run test:coverage
```

## 📊 Database

### Schema
- `User` - User accounts
- `Session` - Authentication sessions
- `Preferences` - User preferences
- `Activity` - User activity tracking

### Migrations

```bash
# Create new migration
npx prisma migrate dev --name <migration_name>

# Deploy migrations to production
npx prisma migrate deploy

# Reset database (local only)
npx prisma migrate reset
```

## 🚀 Deployment

### Environment Variables
See `.env.local.example` for all required variables.

### Production Build
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t enterprise-app .
docker run -p 3000:3000 enterprise-app
```

## 📖 Documentation

- [Architecture Decision Records](./docs/architecture/)
- [API Documentation](./docs/api/)
- [Database Schema](./prisma/schema.prisma)
- [Security Guidelines](./docs/SECURITY.md)

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check database connection
npx prisma db validate

# Regenerate Prisma client
npx prisma generate
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/name`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/name`
4. Submit pull request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For questions or issues, please open a GitHub issue or contact the team.

---

**Created**: 2025-05-10  
**Last Updated**: 2025-05-10  
**Version**: 1.0.0
