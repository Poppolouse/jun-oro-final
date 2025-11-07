# Git / PR instructions

Steps to initialize the repository, commit and push the feature branch (PowerShell):

1) Initialize git and create branch
git init
git checkout -b feature/db-and-api-contract

2) Add files and commit
git add prisma/schema.prisma migrations/initial.sql docs/openapi.yaml package.json PR_RUNBOOK.md .roo/patron-history.json
git commit -m "feat(db): schema + API contract (Phase-1)"

3) Add remote and push (replace <REMOTE_URL> with your repo URL)
git remote add origin <REMOTE_URL>
git push -u origin feature/db-and-api-contract

4) Create PR (optional — GitHub CLI)
gh auth login
gh pr create --title "feat(db): schema + API contract (Phase-1)" --body-file PR_RUNBOOK.md --base main

Notes:
- Do NOT commit secrets. Use Render service environment variables or CI secrets.
- Ensure CI runs `npx prisma generate` and `npx prisma migrate deploy` with DATABASE_URL set.