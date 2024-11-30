# Command Usage

To install the dependencies, run:

```bash
pnpm install
```

To start the development server, run:

```bash
pnpm dev
```

To build the project, run:

```bash
pnpm build
```

To build with analysis, run:

```bash
pnpm build:analyze
```

To start the production server, run:

```bash
pnpm start
```

To check for linting errors, run:

```bash
pnpm lint
```

or for throughout strict type-checking, run:

```bash
pnpm lint:strict
```

or for throughout strict, save incrementally, and JIT type-checking, run:

```bash
pnpm lint:strict --incremental --watch
```

To check for formatting errors, run:

```bash
pnpm prettier:check
```

To auto-fix formatting errors, run:

```bash
pnpm prettier:clean
```

To auto-fix linting errors, run:

```bash
pnpm lint:fix
```

To check for unused stuff, check out [knip](https://knip.dev/) and run:

```bash
pnpm knip
```
