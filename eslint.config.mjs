import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Code leaves whole checkouts of this repo under .claude/worktrees
    // when a task runs in isolation. They are untracked scratch copies, but
    // ESLint walked into them and reported the same findings twice over —
    // 6,000 of the 6,100 problems this config used to print came from there.
    ".claude/**",
  ]),
]);

export default eslintConfig;
