# my-portfolio

A personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- Dark / light mode toggle with `localStorage` persistence
- Fixed navbar with smooth-scroll active section detection
- Animated underline indicator that tracks the current section
- Responsive layout with scrollable content sections

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript 5.9](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [ESLint 9](https://eslint.org/) with TypeScript and React Hooks plugins

## Getting Started

### Prerequisites

- Node.js `>= 22.12.0` (required by Vite 7)
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
my-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   └── Navbar.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## License

MIT © SJKangAU
