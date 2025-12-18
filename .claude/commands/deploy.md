# Deploy

Run the full deployment pipeline for the Digital DevOps website.

## Steps to perform:

1. **Pull latest changes** - `git pull origin main` to get any CI-generated files
2. **Check git status** - Ensure working directory is clean or has expected changes
3. **Run linting** - `npm run lint` to catch any issues
4. **Run tests** - `npm run test` if tests exist
5. **Build slides** - Generate Marp slide decks (optional, CI will also do this):
   - `npm run slides:build` (PDF)
   - `npm run slides:html` (HTML)
6. **Build Next.js app** - `npm run build` to verify production build succeeds
7. **Stage all changes** - `git add -A`
8. **Show diff summary** - Display what will be committed
9. **Commit with descriptive message** - Create a commit summarizing the changes
10. **Push to origin** - `git push origin main`
11. **Monitor GitHub Actions** - Check workflow status with `gh run list --limit 3`
12. **Wait for workflows** - If workflows are in progress, wait and check again
13. **Handle failures** - If a workflow fails:
    - Run `gh run view <run-id> --log-failed` to see error details
    - Fix the issue and re-run the deploy

## Error handling:
- If lint fails, fix the issues before proceeding
- If build fails, diagnose and fix before proceeding
- If slides build fails (marp not installed locally), skip - CI will generate them
- Always show the user what's being committed before pushing
- If GitHub Actions fails, diagnose and fix before considering deploy complete

## Post-deploy:
- Report the commit hash
- Show GitHub Actions workflow status
- Note that Amplify will automatically deploy from main branch
- Confirm slide decks are available at:
  - `/decks/enkai.pdf`
  - `/decks/enkai.html`
- Pull latest after CI completes to sync generated files: `git pull origin main`
