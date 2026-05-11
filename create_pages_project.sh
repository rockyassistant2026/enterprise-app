#!/bin/bash

ACCOUNT_ID="4b712bc96a754176c39296ca0f59127a"
PROJECT_NAME="enterprise-app"
REPO="rockyassistant2026/enterprise-app"

echo "Creating Cloudflare Pages project..."

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $(wrangler whoami 2>&1 | grep 'Token:' | awk '{print $NF}')" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "'$PROJECT_NAME'",
    "description": "Enterprise Application - Auth + API",
    "production_branch": "main",
    "source": {
      "type": "github",
      "config": {
        "owner": "rockyassistant2026",
        "repo_name": "enterprise-app",
        "production_branch": "main",
        "pr_comments_enabled": true,
        "deployments_enabled": true
      }
    },
    "build_config": {
      "build_command": "npm run build",
      "destination_dir": ".next",
      "root_dir": "/"
    },
    "env_vars": {
      "NEXTAUTH_SECRET": {
        "value": "Rocky-Super-Secret-Key-123456789"
      },
      "NEXTAUTH_URL": {
        "value": "https://enterprise-app.pages.dev"
      },
      "NODE_VERSION": {
        "value": "18"
      }
    }
  }' 2>&1

