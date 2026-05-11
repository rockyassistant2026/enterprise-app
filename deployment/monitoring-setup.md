# Monitoring & Logging Setup

## Overview
Comprehensive monitoring, logging, and alerting strategy for production application.

---

## 1. Error Tracking (Sentry)

### Installation
```bash
npm install @sentry/nextjs
```

### Configuration
```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  debug: false,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

### Monitoring
- ✅ Unhandled exceptions
- ✅ Promise rejections
- ✅ API errors
- ✅ Performance issues
- ✅ User interactions

### Alerts
- ✅ Error rate > 1%
- ✅ Performance degradation
- ✅ Database connection issues
- ✅ Authentication failures
- ✅ Security events

---

## 2. Application Logging

### Winston Logger Setup
```bash
npm install winston winston-daily-rotate-file
```

### Configuration
```typescript
// lib/logger.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'enterprise-app' },
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxDays: '30d',
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxDays: '30d',
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
```

### Log Levels
- ERROR: Application errors
- WARN: Warnings and deprecations
- INFO: General information
- DEBUG: Debug information
- TRACE: Detailed trace logs

---

## 3. Request Logging

### Middleware
```typescript
// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';

export function middleware(request: NextRequest) {
  const startTime = Date.now();

  logger.info({
    method: request.method,
    path: request.nextUrl.pathname,
    timestamp: new Date().toISOString(),
  });

  // Process request
  const response = NextResponse.next();
  const duration = Date.now() - startTime;

  logger.info({
    method: request.method,
    path: request.nextUrl.pathname,
    status: response.status,
    duration: `${duration}ms`,
  });

  return response;
}
```

---

## 4. Performance Monitoring

### Web Vitals
```typescript
// lib/metrics.ts
export function reportWebVitals(metric: any) {
  // Send to analytics
  const body = JSON.stringify(metric);
  navigator.sendBeacon('/api/metrics', body);
}
```

### Metrics to Track
- ✅ Cumulative Layout Shift (CLS)
- ✅ First Input Delay (FID)
- ✅ Largest Contentful Paint (LCP)
- ✅ First Contentful Paint (FCP)
- ✅ Time to First Byte (TTFB)

---

## 5. Database Monitoring

### Query Logging
```typescript
// lib/prisma.ts
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ],
});

prisma.$on('query', (e) => {
  logger.debug({
    query: e.query,
    duration: `${e.duration}ms`,
  });
});
```

### Connection Pool Monitoring
```typescript
// Check connection pool status
const status = await prisma.$metrics.prismaClientMetrics();
logger.info('Connection pool status:', status);
```

---

## 6. Security Monitoring

### Failed Login Attempts
```typescript
logger.warn({
  event: 'failed_login',
  email: email,
  ip: req.ip,
  timestamp: new Date(),
});
```

### Account Changes
```typescript
logger.info({
  event: 'account_update',
  user_id: userId,
  changes: { role: 'ADMIN' },
  timestamp: new Date(),
});
```

### Suspicious Activity
- ✅ Multiple failed logins
- ✅ Unusual access patterns
- ✅ Rate limit violations
- ✅ Privilege escalation attempts
- ✅ Data access anomalies

---

## 7. Health Check Endpoint

### Implementation
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database
    await prisma.user.count();

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date(),
      checks: {
        database: 'ok',
        server: 'ok',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
```

---

## 8. Alerting Rules

### High Priority Alerts
- ✅ Error rate > 1%
- ✅ Response time > 2s
- ✅ Database connection pool exhaustion
- ✅ Authentication service down
- ✅ Certificate expiration < 7 days

### Medium Priority Alerts
- ✅ Error rate > 0.5%
- ✅ Response time > 1s
- ✅ Memory usage > 80%
- ✅ Disk space < 20%

### Low Priority Alerts
- ✅ Log volume increase
- ✅ Unused API endpoints
- ✅ Deprecated API usage

---

## 9. Dashboard Metrics

### Key Performance Indicators
- ✅ Requests per second
- ✅ Error rate
- ✅ Average response time
- ✅ P95 response time
- ✅ P99 response time
- ✅ Active user count
- ✅ Database connections
- ✅ Cache hit rate
- ✅ Failed authentication attempts
- ✅ API endpoint usage

---

## 10. Log Retention Policy

### Retention Schedule
- ERROR logs: 90 days
- WARN logs: 30 days
- INFO logs: 14 days
- DEBUG logs: 7 days
- TRACE logs: 3 days

### Archive Strategy
- Move to cold storage after 90 days
- Compress logs older than 30 days
- Delete logs older than 1 year

---

## Implementation Checklist

- [ ] Sentry configured
- [ ] Winston logger setup
- [ ] Request logging enabled
- [ ] Performance monitoring active
- [ ] Database monitoring enabled
- [ ] Security logging configured
- [ ] Health check endpoint deployed
- [ ] Alerting rules created
- [ ] Dashboard setup
- [ ] Log retention policy implemented

