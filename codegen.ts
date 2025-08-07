import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:9000/graphql',
  documents: 'src/grpahql/**/*.graphql',
  generates: {
    'src/generated/graphql.tsx': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
    },
  },
};

export default config;
