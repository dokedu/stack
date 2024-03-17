import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:1323/query",
  documents: ["pages/**/*.vue"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
    "./gql/schema.ts": {
      plugins: ["typescript", "typescript-urql-graphcache"],
    },
    "./gql/introspection.ts": {
      plugins: ["urql-introspection"],
    },
  },
};

export default config;
