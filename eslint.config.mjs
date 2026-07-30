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
    // This project sets `distDir: "dist"` in next.config.ts, so the build
    // output lands in dist/ rather than the default .next/ or out/. Without
    // this entry eslint lints the generated bundles: that accounted for
    // roughly 8,300 of the 8,429 reported problems, which is why lint had
    // never been worth gating on.
    "dist/**",
  ]),
]);

export default eslintConfig;
