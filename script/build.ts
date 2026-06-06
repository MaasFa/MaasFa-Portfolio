import { build } from "esbuild";
import { execSync } from "child_process";
import { rmSync, mkdirSync } from "fs";

// Clean dist folder
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

// Build frontend with Vite
execSync("npx vite build", { stdio: "inherit" });

// Build backend with esbuild
await build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: "dist/index.cjs",
  packages: "external",
});

console.log("✅ Build complete!");
