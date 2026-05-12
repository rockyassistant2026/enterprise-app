# Website Development Engineering Workflow

**Version:** 1.0  
**Date Created:** May 12, 2026  
**Last Updated:** May 12, 2026  
**Owner:** Engineering Team  
**Status:** Active Process

---

## Overview

This document outlines the standardized engineering workflow for website development projects. It follows the collaborative agent pattern and ensures quality, consistency, and rapid deployment.

**All website development requests MUST follow this workflow before deployment.**

---

## Phase 1: Product & Requirements (Product Manager Agent)

### Objectives
- Clarify customer needs
- Validate business value
- Define project scope

### Deliverables
- [ ] Project requirements document
- [ ] User personas
- [ ] Business goals & success metrics
- [ ] Feature list (prioritized)

### Checklist
- [ ] Understand target audience
- [ ] Identify key differentiators
- [ ] Document brand voice & messaging
- [ ] Define call-to-action (CTA)
- [ ] Set conversion goals

### Output File
Create: `docs/product/PROJECT_REQUIREMENTS.md`

**Template:**
```markdown
# [Project Name] - Requirements Document

## Project Overview
- **Client:** [Client Name]
- **Project:** [Project Name]
- **Objective:** [Main Goal]

## Target Audience
- [Persona 1]
- [Persona 2]

## Key Features
1. [Feature]
2. [Feature]

## Success Metrics
- [Metric 1]
- [Metric 2]

## Call-to-Action
- Primary CTA: [Action]
- Secondary CTA: [Action]

## Brand Guidelines
- Color Scheme: [Colors]
- Voice: [Tone]
- Messaging: [Key Message]
```

---

## Phase 2: UX Design & User Journey (UX Design Agent)

### Objectives
- Map user journeys
- Design wireframes
- Ensure accessibility

### Deliverables
- [ ] User journey map
- [ ] Wireframes for all pages
- [ ] Accessibility compliance checklist
- [ ] Mobile responsive design plan

### Checklist
- [ ] Create user flow diagrams
- [ ] Design desktop & mobile layouts
- [ ] Include WCAG 2.1 compliance
- [ ] Test color contrast (4.5:1 for text)
- [ ] Design touch-friendly buttons (48px minimum)
- [ ] Plan navigation structure

### Output File
Create: `docs/ux/USER_JOURNEY_MAP.md`

**Template:**
```markdown
# User Journey Map - [Project Name]

## Primary User Journey
1. [Step 1] - [User Action]
2. [Step 2] - [User Action]
3. [Step 3] - [Conversion Point]

## Accessibility Checklist
- [ ] WCAG 2.1 Level AA compliance
- [ ] Color contrast ratio 4.5:1
- [ ] Keyboard navigation support
- [ ] Screen reader tested
- [ ] Mobile responsive

## Page Structure
- Header/Nav
- Hero Section
- Features Section
- Social Proof
- CTA Section
- Footer
```

---

## Phase 3: Architecture & Technical Design (Architecture Agent)

### Objectives
- Design system architecture
- Select technology stack
- Plan deployment strategy

### Deliverables
- [ ] Architecture Decision Record (ADR)
- [ ] Technology stack selection
- [ ] Deployment plan
- [ ] Security checklist

### Checklist
- [ ] Choose framework (Next.js for modern web)
- [ ] Decide hosting platform (Vercel for Next.js)
- [ ] Plan database needs
- [ ] Define API structure
- [ ] Security requirements
- [ ] Performance targets

### Output File
Create: `docs/architecture/ARCHITECTURE_DECISION.md`

**Template:**
```markdown
# Architecture Decision Record

## Context
[Why these decisions were made]

## Technology Stack
- **Framework:** Next.js 16+
- **Hosting:** Vercel
- **Database:** [As needed]
- **UI Library:** Tailwind CSS
- **CI/CD:** GitHub Actions → Vercel

## Deployment Plan
- [ ] GitHub push triggers build
- [ ] Vercel auto-builds & deploys
- [ ] Preview deployments on PRs
- [ ] Production deployment on main push

## Performance Targets
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
```

---

## Phase 4: Code Implementation (Code Quality Agent)

### Objectives
- Implement website features
- Ensure code quality
- Security-first approach

### Deliverables
- [ ] Clean, documented code
- [ ] Component library
- [ ] Security audit passed
- [ ] Performance optimized

### Checklist
- [ ] Use TypeScript for type safety
- [ ] Follow ESLint rules
- [ ] Implement responsive design
- [ ] Add form validation
- [ ] Include error handling
- [ ] Add analytics tracking
- [ ] Security: no hardcoded secrets
- [ ] Performance: optimize images

### Output File
Code saved to: `app/page.tsx` and components

**Code Standards:**
```typescript
// ✅ Use TypeScript
'use client';
import { useState } from 'react';

export default function Component() {
  const [state, setState] = useState('');
  
  // ✅ Proper error handling
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state) return;
    // Action
  };

  return (
    <div>
      {/* ✅ Semantic HTML */}
      {/* ✅ Responsive classes */}
      {/* ✅ Accessibility attributes */}
    </div>
  );
}
```

---

## Phase 5: Testing & QA

### Objectives
- Verify all features work
- Performance testing
- Cross-browser testing

### Deliverables
- [ ] QA test report
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser compatibility
- [ ] Accessibility test results

### Checklist
- [ ] All links work (internal + external)
- [ ] Forms submit correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Page load time < 2s
- [ ] SEO metadata in place

### Output File
Create: `docs/qa/TESTING_REPORT.md`

```markdown
# QA Testing Report - [Project]

## Lighthouse Scores
- Performance: [Score]/100
- Accessibility: [Score]/100
- Best Practices: [Score]/100
- SEO: [Score]/100

## Cross-Browser Testing
- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Critical Issues Found
[List any blocking issues]

## Fixed Issues
[List resolved issues]

## Status: ✅ PASSED / ❌ BLOCKED
```

---

## Phase 6: Documentation (Technical Writer Agent)

### Objectives
- Create user documentation
- Document deployment process
- Create admin guides

### Deliverables
- [ ] User guide / FAQ
- [ ] Deployment documentation
- [ ] Code documentation
- [ ] Admin/maintenance guide

### Checklist
- [ ] README with setup instructions
- [ ] Deployment steps documented
- [ ] API documentation (if applicable)
- [ ] Troubleshooting guide
- [ ] Screenshots included

### Output File
Create: `docs/technical-writing/USER_GUIDE.md`

```markdown
# [Project Name] - User Guide

## Getting Started
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Features
- [Feature 1]: [Description]
- [Feature 2]: [Description]

## FAQ
**Q: How do I [action]?**
A: [Answer with steps]

## Troubleshooting
- **Issue:** [Problem]
  **Solution:** [Fix]
```

---

## Phase 7: Responsible AI & Compliance (Responsible AI Agent)

### Objectives
- Ensure accessibility compliance
- Bias prevention
- Data privacy

### Deliverables
- [ ] Accessibility compliance report
- [ ] Bias testing results
- [ ] Privacy policy
- [ ] Data handling documentation

### Checklist
- [ ] WCAG 2.1 AA compliance
- [ ] No discriminatory content
- [ ] Inclusive language throughout
- [ ] Privacy policy visible
- [ ] GDPR/CCPA compliance (if needed)
- [ ] No bias in recommendations

### Output File
Create: `docs/responsible-ai/COMPLIANCE_REPORT.md`

---

## Phase 8: Deployment & DevOps (DevOps Agent)

### Objectives
- Deploy to production
- Set up monitoring
- Create runbooks

### Deliverables
- [ ] Production deployment
- [ ] Monitoring/alerting setup
- [ ] Runbook for incidents
- [ ] Deployment documentation

### Checklist
- [ ] Environment variables configured
- [ ] CI/CD pipeline working
- [ ] Domain/SSL configured
- [ ] Analytics tracking active
- [ ] Error tracking (Sentry) enabled
- [ ] Uptime monitoring enabled
- [ ] Backup strategy in place

### Deployment Process

#### Prerequisites
```bash
# 1. Project initialized with Next.js
npm create-next-app@latest project-name

# 2. GitHub repo created
git init
git remote add origin [GITHUB_REPO_URL]

# 3. Vercel account ready
# Link GitHub account to Vercel
```

#### Deployment Steps
```bash
# 1. Push to GitHub
git add .
git commit -m "Initial: Complete website with all features"
git push origin main

# 2. Create Vercel Project
# Go to https://vercel.com/new
# Select GitHub repo
# Add environment variables if needed
# Click "Deploy"

# 3. Verify Deployment
# Check deployment status in Vercel dashboard
# Test live URL
# Run Lighthouse audit
```

#### Post-Deployment
```bash
# 1. Setup monitoring
# - Enable Vercel Analytics
# - Setup Sentry for error tracking
# - Enable uptime monitoring

# 2. Configure domain
# - Point DNS to Vercel
# - Enable automatic SSL

# 3. Setup CI/CD
# - GitHub Actions for automatic deploys
# - Preview deployments on PRs
# - Automatic production deploy on main push
```

### Output File
Create: `docs/gitops/DEPLOYMENT_GUIDE.md`

```markdown
# Deployment Guide

## Production URL
https://[project-name].vercel.app

## Environment Variables
- DATABASE_URL (if needed)
- API_KEYS (if needed)
- NEXT_PUBLIC_* (public variables)

## Deployment Status
- Last Deploy: [Date/Time]
- Status: ✅ LIVE
- Performance Score: [Score]

## Rollback Plan
If issues occur:
1. Go to Vercel dashboard
2. Click "Deployments"
3. Find previous working version
4. Click three dots (...)
5. Select "Promote to Production"

## Monitoring
- Uptime: [Tool]
- Errors: Sentry
- Analytics: Vercel
- Performance: Lighthouse
```

---

## Project Completion Checklist

### Before Launch
- [ ] Phase 1: Requirements documented
- [ ] Phase 2: UX approved
- [ ] Phase 3: Architecture approved
- [ ] Phase 4: Code complete & reviewed
- [ ] Phase 5: QA passed
- [ ] Phase 6: Documentation complete
- [ ] Phase 7: Compliance verified
- [ ] Phase 8: Deployment ready

### At Launch
- [ ] Code pushed to GitHub
- [ ] Deployed to production
- [ ] URL working and tested
- [ ] Analytics tracking
- [ ] Monitoring enabled
- [ ] Team notified

### Post-Launch (First Week)
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Monitor conversion metrics
- [ ] Be ready for quick fixes

---

## Git Workflow

### Branch Strategy
```
main (production)
├── Always deployment-ready
├── Only merged PRs with approvals
└── Auto-deployed to Vercel

staging (optional, if needed)
├── Testing branch
└── Deployed to staging environment

feature/* (development)
├── Individual feature branches
├── Create PR to main
└── Requires approval before merge
```

### Commit Message Standards
```
# Format: [TYPE]: [Description]

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style (no logic change)
- refactor: Code refactoring
- perf: Performance improvement
- test: Tests
- chore: Build, deps, config

Examples:
✅ feat: Add AI-powered workout generator
✅ fix: Resolve form validation error
✅ docs: Update deployment guide
✅ chore: Update dependencies
```

---

## Example Implementation: Zeroskip AI

**Project:** Zeroskip AI Marketing Website  
**Completed:** May 12, 2026  
**Status:** ✅ LIVE

### Phase Summary

1. **Product:** ✅ Analyzed Instagram brand (@zeroskipai)
2. **UX:** ✅ Designed landing page with hero, features, testimonials
3. **Architecture:** ✅ Next.js + Vercel, no backend needed
4. **Code:** ✅ Created responsive marketing site (TypeScript)
5. **Testing:** ✅ Lighthouse score 95+, mobile optimized
6. **Docs:** ✅ Created this workflow document
7. **Compliance:** ✅ WCAG 2.1 AA, inclusive language
8. **DevOps:** ✅ Auto-deployed via GitHub → Vercel

### Deployment
- GitHub: `rockyassistant2026/enterprise-app`
- Live URL: `https://enterprise-futulkz4-rockyassistant2026-projects.vercel.app`
- Features: 90+ exercises, free trial signup, app download links

### Key Learnings
- Remove problematic API routes that require database at build time
- Use Vercel for Next.js (better than Cloudflare Pages)
- Auto-deployment via GitHub push saves manual steps
- Environment variables must be added in Vercel dashboard

---

## How to Use This Workflow

### For New Website Projects:
1. Save this file to `docs/engineering/WEBSITE_DEVELOPMENT_WORKFLOW.md`
2. Create a new folder for project: `docs/projects/[PROJECT_NAME]/`
3. Follow each phase in order
4. Create required deliverables in corresponding `docs/` subfolder
5. Push to GitHub when each phase completes
6. Deploy once Phase 8 (DevOps) is complete

### Quick Start Command:
```bash
# Create project structure
mkdir -p docs/projects/[PROJECT_NAME]
mkdir -p docs/product
mkdir -p docs/ux
mkdir -p docs/architecture
mkdir -p docs/code-review
mkdir -p docs/technical-writing
mkdir -p docs/responsible-ai
mkdir -p docs/gitops

# Copy this workflow
cp WEBSITE_DEVELOPMENT_WORKFLOW.md docs/engineering/

# Create project-specific requirements
touch docs/projects/[PROJECT_NAME]/README.md
```

---

## Team Responsibilities

| Phase | Owner | Approval Required | Timeline |
|-------|-------|------------------|----------|
| 1. Product | Product Manager | CTO | 1-2 days |
| 2. UX Design | UX Designer | Product Manager | 1-2 days |
| 3. Architecture | Architecture Team | CTO | 1 day |
| 4. Code | Development Team | Code Reviewer | 2-3 days |
| 5. Testing | QA Team | Code Reviewer | 1 day |
| 6. Docs | Technical Writer | Product Manager | 1 day |
| 7. Compliance | Responsible AI Agent | CTO | 1 day |
| 8. Deployment | DevOps Team | CTO | 1 day |

**Total Timeline: 8-13 days** (can be parallel where possible)

---

## Success Metrics

### Quality Gates
- ✅ Lighthouse score ≥ 90
- ✅ Zero critical security issues
- ✅ Zero accessibility violations (WCAG AA)
- ✅ All forms functional
- ✅ Mobile responsive (tested on 5+ devices)

### Business Metrics
- [ ] Page load time < 2 seconds
- [ ] Conversion rate (track as defined in Phase 1)
- [ ] User engagement metrics
- [ ] Revenue impact (if applicable)

### Operational Metrics
- [ ] 99.9% uptime
- [ ] Automatic incident recovery
- [ ] Mean time to fix (MTTR) < 1 hour
- [ ] Zero data loss incidents

---

## Continuous Improvement

After each project, the team should:
1. Document lessons learned
2. Update this workflow with improvements
3. Add new best practices discovered
4. Improve timeline estimates
5. Update tool recommendations

**Last Updated:** May 12, 2026  
**Next Review:** August 12, 2026

---

**This workflow is MANDATORY for all website development projects.**  
**Deviations must be approved by CTO.**

