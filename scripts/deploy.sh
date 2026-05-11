#!/bin/bash

# Production Deployment Script

set -e

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_DIR="/opt/enterprise-app"
BACKUP_DIR="/opt/backups"
LOG_FILE="/var/log/deployment.log"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Step 1: Validate environment
log "Validating environment..."
if [ ! -d "$DEPLOY_DIR" ]; then
    error "Deploy directory not found: $DEPLOY_DIR"
fi

if ! command -v node &> /dev/null; then
    error "Node.js not installed"
fi

log "✓ Environment validation passed"

# Step 2: Create backup
log "Creating database backup..."
mkdir -p $BACKUP_DIR
BACKUP_FILE="$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).sql"
pg_dump -U postgres $DB_NAME > $BACKUP_FILE || error "Backup failed"
log "✓ Backup created: $BACKUP_FILE"

# Step 3: Stop application
log "Stopping application..."
systemctl stop enterprise-app || warn "Application not running"
sleep 2
log "✓ Application stopped"

# Step 4: Pull latest code
log "Pulling latest code..."
cd $DEPLOY_DIR
git pull origin main || error "Git pull failed"
log "✓ Code updated"

# Step 5: Install dependencies
log "Installing dependencies..."
npm ci || error "Dependency installation failed"
log "✓ Dependencies installed"

# Step 6: Run tests
log "Running tests..."
npm test -- --passWithNoTests || error "Tests failed"
log "✓ Tests passed"

# Step 7: Build application
log "Building application..."
npm run build || error "Build failed"
log "✓ Build completed"

# Step 8: Run database migrations
log "Running database migrations..."
npx prisma migrate deploy || error "Database migration failed"
log "✓ Database migrations completed"

# Step 9: Start application
log "Starting application..."
systemctl start enterprise-app || error "Failed to start application"
sleep 3
log "✓ Application started"

# Step 10: Health check
log "Running health checks..."
HEALTH_CHECK=$(curl -s http://localhost:3000/api/health)
if echo "$HEALTH_CHECK" | grep -q "healthy"; then
    log "✓ Health check passed"
else
    error "Health check failed: $HEALTH_CHECK"
fi

# Step 11: Smoke tests
log "Running smoke tests..."
npm run test:smoke || error "Smoke tests failed"
log "✓ Smoke tests passed"

log "🎉 Deployment completed successfully!"
log "Backup location: $BACKUP_FILE"

