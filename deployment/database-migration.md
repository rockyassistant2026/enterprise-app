# Database Migration Strategy

## Pre-Migration Checklist

### Planning
- [ ] Schedule maintenance window
- [ ] Notify stakeholders
- [ ] Prepare rollback plan
- [ ] Create database backup
- [ ] Test migration in staging
- [ ] Verify data integrity checklist
- [ ] Document all changes

### Backup & Verification
- [ ] Full database backup
- [ ] Backup verification
- [ ] Data integrity report
- [ ] Rollback procedure documented

---

## Migration Process

### Step 1: Backup Current Database
```bash
# PostgreSQL backup
pg_dump -U postgres enterprise_db > backup-$(date +%Y%m%d-%H%M%S).sql

# Verify backup
pg_restore --list backup-*.sql | head -20
```

### Step 2: Pre-Migration Validation
```bash
# Run migration in dry-run mode
npx prisma migrate resolve --rolled-back 20240511000000_init

# Check migration status
npx prisma migrate status
```

### Step 3: Execute Migration
```bash
# Apply pending migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### Step 4: Post-Migration Verification
```bash
# Verify schema
npx prisma db execute --stdin < schema-check.sql

# Validate data integrity
npx ts-node scripts/verify-migration.ts
```

### Step 5: Application Restart
```bash
# Stop current application
systemctl stop enterprise-app

# Deploy new code
git pull origin main
npm install
npm run build

# Start application
systemctl start enterprise-app

# Verify application
curl http://localhost:3000/api/health
```

---

## Migration Rollback Procedure

### If Issues Detected
```bash
# 1. Stop application
systemctl stop enterprise-app

# 2. Restore from backup
psql -U postgres enterprise_db < backup-*.sql

# 3. Verify restoration
npx prisma db execute --stdin < verify.sql

# 4. Restart application
systemctl start enterprise-app

# 5. Notify stakeholders
# Post incident report with root cause analysis
```

---

## Zero-Downtime Migration Strategy

### For Large Tables
```typescript
// 1. Create new column (non-blocking)
prisma.$executeRaw`ALTER TABLE users ADD COLUMN new_field VARCHAR(255);`

// 2. Backfill data (in batches to avoid locks)
const BATCH_SIZE = 1000;
const totalUsers = await prisma.user.count();

for (let offset = 0; offset < totalUsers; offset += BATCH_SIZE) {
  await prisma.$executeRaw`
    UPDATE users 
    SET new_field = SOME_COMPUTATION(old_field)
    WHERE id IN (
      SELECT id FROM users 
      LIMIT ${BATCH_SIZE} OFFSET ${offset}
    )
  `;
}

// 3. Add NOT NULL constraint
prisma.$executeRaw`ALTER TABLE users ALTER COLUMN new_field SET NOT NULL;`

// 4. Drop old column
prisma.$executeRaw`ALTER TABLE users DROP COLUMN old_field;`
```

---

## Data Integrity Checks

```typescript
// scripts/verify-migration.ts
import { prisma } from '@/lib/prisma';

async function verifyMigration() {
  console.log('Starting migration verification...');

  // Check user count
  const userCount = await prisma.user.count();
  console.log(`✓ Users: ${userCount}`);

  // Check session integrity
  const sessionsWithoutUsers = await prisma.session.findMany({
    where: {
      user: { is: null }
    },
  });
  if (sessionsWithoutUsers.length === 0) {
    console.log('✓ All sessions have valid users');
  }

  // Check preferences integrity
  const preferencesWithoutUsers = await prisma.preferences.findMany({
    where: {
      user: { is: null }
    },
  });
  if (preferencesWithoutUsers.length === 0) {
    console.log('✓ All preferences have valid users');
  }

  // Verify indexes
  const indexes = await prisma.$queryRaw`SELECT * FROM pg_indexes WHERE schemaname = 'public'`;
  console.log(`✓ Total indexes: ${(indexes as any[]).length}`);

  console.log('Migration verification complete!');
}

verifyMigration().catch(console.error);
```

---

## Deployment Timeline

```
T-24h: Final testing in staging
T-12h: Notify all stakeholders
T-1h:  Final backup verification
T-0m:  Start maintenance window
T+5m:  Stop application
T+10m: Backup database
T+15m: Execute migration
T+20m: Verify data integrity
T+25m: Deploy new code
T+30m: Restart application
T+35m: Smoke testing
T+45m: End maintenance window
T+60m: Monitoring verification
```

---

## Rollback Timeline

```
T-5m: Issue detected
T-0m: Initiate rollback
T+5m: Stop application
T+10m: Restore from backup
T+15m: Verify restoration
T+20m: Restart application
T+25m: Smoke testing
T+35m: Notify stakeholders
```

---

## Success Criteria

- [ ] All tests passing
- [ ] No data corruption
- [ ] Application responsive (< 500ms)
- [ ] All endpoints working
- [ ] Authentication working
- [ ] User data intact
- [ ] Audit logs intact
- [ ] No error spikes
- [ ] CPU/Memory normal
- [ ] Database connections normal

