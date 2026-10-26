# my-portfolio

A portfolio website for business analysis and automation roles, built with React, TypeScript, Vite, and Tailwind CSS v4. It leads with a real-client case study (requirements, process change, test evidence and BA documents) alongside software projects.

Live site: https://sjkang.dev

## Features

- Space-themed background with parallax star field across 3 depth layers
- Constellation cursor interactions — lines draw between stars near your cursor
- Dark / light mode toggle with `localStorage` persistence
- Fixed navbar with smooth-scroll active section detection and animated underline
- Responsive navbar with hamburger menu on mobile
- Hero section with staggered fade-in animations, mouse parallax, and a single primary call to action
- About section with bio, education cards, and categorised tech stack
- Work Experience section
- Case study section: summary cards up front, expandable requirements, as-is / to-be process diagram, test scenarios, stakeholder analysis, scope, RAID log and traceability
- Projects section with featured cards, a compact "More work" row, expandable detail view, and GitHub, live demo and report links
- Contact section with email, LinkedIn, GitHub, and resume cards
- Scroll-reveal animations, scroll progress bar, count-up numbers and magnetic buttons, all respecting `prefers-reduced-motion`
- Resume button in the navbar (desktop and mobile)

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
├── public/                     # resume.pdf, project report PDFs, favicon, OG image
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed navbar, scroll detection, mobile menu, resume button
│   │   ├── SpaceBackground.tsx # Canvas star field, parallax, constellation interactions
│   │   ├── Hero.tsx            # Landing section with name, tagline and calls to action
│   │   ├── About.tsx           # Bio, education, and tech stack
│   │   ├── Experience.tsx      # Work experience
│   │   ├── Projects.tsx        # Featured and compact project cards with links
│   │   ├── CaseStudy.tsx       # Sua Hair case study and BA documents
│   │   ├── Contact.tsx         # Email, LinkedIn, GitHub, and resume cards
│   │   ├── CountUp.tsx         # Animated number counter
│   │   ├── Magnetic.tsx        # Cursor-attracted button wrapper
│   │   └── ScrollProgress.tsx  # Scroll progress bar
│   ├── lib/                    # Scroll-reveal helpers
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

| Project                   | Links                                                                          |
| ------------------------- | ------------------------------------------------------------------------------ |
| Sua Hair Booking System   | [GitHub](https://github.com/SJKangAU/sua-hair), [Live](https://sua-hair.vercel.app/) |
| IntelliJourney            | [Live Demo](https://www.intellijourney.education/)                             |
| Bias in Job Salaries      | [Report](public/MachineLearning_SalaryBias_Report.pdf)                         |
| Multi-threaded Whiteboard | [GitHub](https://github.com/SJKangAU/JavaWhiteBoard)                           |
| Computer Vision Project   | [Report](public/ComputerVision_Report.pdf)                                     |
| Portfolio Website         | [GitHub](https://github.com/SJKangAU/my-portfolio)                             |

## License

MIT © SJKangAU
