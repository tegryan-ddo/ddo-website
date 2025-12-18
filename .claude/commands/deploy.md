# Deploy

Run the full deployment pipeline for the Digital DevOps website.

## Steps to perform:

1. **Check git status** - Ensure working directory is clean or has expected changes
2. **Run linting** - `npm run lint` to catch any issues
3. **Run tests** - `npm run test` if tests exist
4. **Build slides** - Generate Marp slide decks:
   - `npm run slides:build` (PDF)
   - `npm run slides:html` (HTML)
5. **Build Next.js app** - `npm run build` to verify production build succeeds
6. **Stage all changes** - `git add -A`
7. **Show diff summary** - Display what will be committed
8. **Commit with descriptive message** - Create a commit summarizing the changes
9. **Push to origin** - `git push origin main`

## Error handling:
- If lint fails, fix the issues before proceeding
- If build fails, diagnose and fix before proceeding
- If slides build fails (marp not installed), skip and note in commit message
- Always show the user what's being committed before pushing

## Post-deploy:
- Report the commit hash
- Note that Amplify will automatically deploy from main branch
- Remind about `/decks/enkai.pdf` availability after GitHub Actions runs
