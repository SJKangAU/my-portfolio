# my-portfolio

A personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS v4.

Live site: https://sjkang.dev

## Features

- Space-themed background with parallax star field across 3 depth layers
- Constellation cursor interactions — lines draw between stars near your cursor
- Dark / light mode toggle with `localStorage` persistence
- Fixed navbar with smooth-scroll active section detection and animated underline
- Responsive navbar with hamburger menu on mobile
- Hero section with staggered fade-in animations, mouse parallax, and resume link
- About section with bio, education cards, and categorised tech stack
- Projects section with expandable card-to-grid animation, GitHub, live demo, and report links
- Contact section with email, LinkedIn, GitHub, and resume cards

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
│   ├── vite.svg
│   └── Jason_Kang_Resume.pdf
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed navbar with scroll detection and mobile hamburger menu
│   │   ├── SpaceBackground.tsx # Canvas star field, parallax, constellation interactions
│   │   ├── Hero.tsx            # Landing section with name, tagline, CTAs, and resume link
│   │   ├── About.tsx           # Bio, education, and tech stack
│   │   ├── Projects.tsx        # Expandable project cards with links
│   │   └── Contact.tsx         # Email, LinkedIn, GitHub, and resume cards
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

## Projects

| Project                   | Links                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| IntelliJourney            | [Live Demo](https://www.intellijourney.education/)                                       |
| Multi-threaded Whiteboard | [GitHub](https://github.com/SJKangAU/JavaWhiteBoard)                                     |
| Recipe App                | Report (coming soon)                                                                     |
| Bias in Job Salaries      | [Report](https://github.com/SJKangAU/my-portfolio/MachineLearning_SalaryBias_Report.pdf) |
| Computer Vision Project   | [Report](https://github.com/SJKangAU/my-portfolio/ComputerVision_Report.pdf)             |
| Portfolio Website         | [GitHub](https://github.com/SJKangAU/my-portfolio)                                       |

## License

MIT © SJKangAU
