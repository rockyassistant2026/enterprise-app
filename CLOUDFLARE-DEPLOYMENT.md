# Cloudflare Pages Deployment Guide (Free Tier)

## Overview
Deploy the Enterprise Application to Cloudflare Pages (free tier) with serverless functions and D1 database.

---

## Prerequisites

✅ Cloudflare Account (Free)
✅ GitHub Account (for Pages integration)
✅ Project Repository
✅ wrangler CLI installed

---

## Step 1: Create Cloudflare Account

1. Go to https://dash.cloudflare.com
2. Sign up for free
3. Verify email
4. Note your Account ID (Settings → Account details)

---

## Step 2: Install Wrangler CLI

```bash
npm install -g wrangler
# Or
npm install wrangler --save-dev
```

---

## Step 3: Authenticate with Cloudflare

```bash
wrangler login
# This will open browser to authenticate
# Grant access and return to terminal
```

---

## Step 4: Deploy to Cloudflare Pages

### Option A: Using GitHub (Recommended)

1. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/enterprise-app
git push -u origin main
```

2. **Create Pages Project**
   - Go to https://dash.cloudflare.com/pages
   - Click "Create a project"
   - Select GitHub account
   - Authorize Cloudflare
   - Choose repository
   - Configure build settings:
     - **Framework**: Next.js
     - **Build command**: `npm run build`
     - **Build output directory**: `.next`

3. **Set Environment Variables**
   - In Pages project settings:
   ```
   NEXTAUTH_SECRET=<random-secret>
   NEXTAUTH_URL=https://your-domain.pages.dev
   NODE_VERSION=18
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete
   - View at: `https://your-project.pages.dev`

### Option B: Using Wrangler CLI

```bash
# Build application
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next/static --project-name enterprise-app
```

---

## Step 5: Configure Custom Domain (Optional)

1. **Add Domain to Cloudflare**
   - https://dash.cloudflare.com/add-site
   - Follow setup instructions
   - Update nameservers at registrar

2. **Connect to Pages Project**
   - Pages project settings
   - Custom domains
   - Add your domain
   - Verify DNS

---

## Step 6: Configure Database (D1)

### Create D1 Database

```bash
wrangler d1 create enterprise-app
# Note the database_id returned
```

### Update wrangler.toml

```toml
[[d1_databases]]
binding = "DB"
database_name = "enterprise-app"
database_id = "your-database-id"
```

### Migrate Schema

```bash
# Create migration
wrangler d1 execute enterprise-app --file=prisma/schema.sql

# Or
npx prisma migrate deploy
```

---

## Step 7: Environment Variables

**Set in Cloudflare Pages:**

```env
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=https://your-domain.pages.dev
DATABASE_URL=d1://enterprise-app
NODE_ENV=production
LOG_LEVEL=info
```

**Get NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Step 8: Deploy & Verify

```bash
# Trigger deployment via GitHub push
git push origin main

# Or manually deploy
wrangler pages deploy

# Check deployment
curl https://your-domain.pages.dev/api/health
```

---

## Cloudflare Pages Free Tier Limits

| Feature | Free Tier | Notes |
|---------|-----------|-------|
| **Deployments** | 500/month | More than enough |
| **Build Minutes** | Unlimited | Standard limits apply |
| **Bandwidth** | Unlimited | Global CDN included |
| **Functions** | Included | 100,000 req/day free |
| **D1 Database** | 3 databases | SQLite included |
| **Storage** | 100MB | R2 storage bucket |

---

## Troubleshooting

### Build Fails

```bash
# Check build logs
wrangler pages project list

# Test build locally
npm run build
```

### Database Connection Issues

```bash
# Test D1 connection
wrangler d1 list

# Query database
wrangler d1 execute enterprise-app --command "SELECT 1"
```

### Environment Variables Not Set

```bash
# Verify in Pages
wrangler pages project info

# Redeploy after changing vars
git commit --allow-empty -m "Redeploy"
git push origin main
```

### 404 on API Routes

```bash
# Ensure routes are in /app/api
# Check _routes.json configuration
cat .next/_routes.json
```

---

## API Health Check

```bash
# Test health endpoint
curl https://your-domain.pages.dev/api/health

# Expected response
{
  "status": "healthy",
  "timestamp": "2025-05-11T...",
  "checks": {
    "database": "ok",
    "server": "ok"
  }
}
```

---

## Monitoring on Cloudflare

1. **Analytics**
   - Pages dashboard
   - View requests, errors, response times

2. **Logs**
   - Tail logs: `wrangler tail`
   - Real-time request monitoring

3. **Alerts**
   - Set up in Cloudflare dashboard
   - Monitor error rates
   - Get notified on failures

---

## Custom Domain Setup

### Using Cloudflare DNS

```bash
# Add CNAME for subdomain
# Name: api
# Content: your-project.pages.dev
# TTL: Auto

# Or update nameservers for root domain
# Cloudflare provides instructions
```

### Free SSL/TLS

- Automatically issued
- Always-on encryption
- Renewal automatic

---

## Performance Optimization

```txt
Cloudflare Free Tier Benefits:
✅ Global CDN (200+ data centers)
✅ Automatic compression
✅ Browser caching
✅ Minification
✅ DDoS protection
✅ Free SSL/TLS
✅ Web Application Firewall (basic)
```

---

## Deployment URL

After deployment, your application will be available at:

```
https://your-project.pages.dev
```

Or with custom domain:

```
https://yourdomain.com
```

---

## Next Steps

1. ✅ Deploy application
2. ✅ Verify health check
3. ✅ Test API endpoints
4. ✅ Monitor performance
5. ✅ Set up alerts
6. ✅ Plan scaling

---

## Support

- Cloudflare Docs: https://developers.cloudflare.com
- Pages Docs: https://developers.cloudflare.com/pages
- Workers Docs: https://developers.cloudflare.com/workers

