# Project Status

This document tracks the development progress of the Jun-Oro v2 project.

## Current Task

- **Objective:** Set up the main application and prepare for subdomain-based app hosting.
- **Status:** Completed

## Checklist

- [x] Create `STATUS.md` file.
- [x] Set up the main application (`portal`).
  - [x] Fetch app list from the backend.
- [x] Configure subdomains for applications. (See `docs/developer/features/subdomain-configuration.md`)
- [x] Integrate with the backend.
- [x] Utilize Cloudflare services (Pages, R2, Workers).
  - [x] Portal is ready for deployment to Cloudflare Pages.
  - [x] R2 usage guide created (`docs/developer/features/r2-usage.md`).
  - [ ] Cloudflare Workers can be used for future serverless functions.

## Notes

- The project will be developed iteratively, following the guidelines in `.trae/rules/project_rules.md`.
