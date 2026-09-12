import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // The architectural rules from AGENTS.md, enforced rather than trusted.
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/lib/fixtures/*", "**/lib/fixtures/*"],
              message:
                "Only src/lib/data/ may import fixtures — that seam is what makes the CMS swap free. Add a function to lib/data/ instead.",
            },
            {
              group: ["three", "three/*", "@react-three/*"],
              message:
                "three.js is confined to src/features/hero/. Nothing else may import it, and the scene must load via next/dynamic with ssr:false.",
            },
          ],
        },
      ],
    },
  },
  // ...except in the two places that own them.
  {
    files: ["src/lib/data/**"],
    rules: { "no-restricted-imports": "off" },
  },
  {
    files: ["src/features/hero/**"],
    rules: { "no-restricted-imports": "off" },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
