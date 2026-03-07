# MEMORY — Agent Status Dashboard

## Key Decisions
- Using Next.js 14 App Router for modern React server components
- No database initially — will read from GitHub API
- Single page, no auth needed (public dashboard)
- Minimal viable product: status + activity feed only

## Technical Notes
- Will use GitHub REST API for commit history (no auth needed for public repos)
- Can extend later to read cron job history from some storage
- Vercel deployment: auto-connected to GitHub main branch

## Future Enhancements
- Add Supabase for storing activity history
- Add authentication for admin dashboard
- Real-time updates via WebSockets
- GitHub contribution graph visualization
- Twitter/X follower count
- Blog post count
