# Fix Windows Compatibility for Scripts

The current `package.json` scripts use Unix-style environment variable setting (`NODE_ENV=development ...`), which fails on Windows PowerShell/CMD. We will fix this by using `cross-env`.

## Steps
- [x] Install `cross-env` as a dev dependency <!-- id: 0 -->
- [x] Update `package.json` scripts to use `cross-env` <!-- id: 1 -->
- [ ] Verify `npm run dev` works <!-- id: 2 -->
