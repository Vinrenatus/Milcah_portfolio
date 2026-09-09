# Milcah Mwangi's Portfolio

Personal portfolio website for **Milcah Mwangi** — Senior Software Engineer, Fintech Systems & AI Model Evaluation.

All site content is derived from `public/Milcah_Mwangi_Resume.pdf`.

## Project Structure

```
public/
└── db.json           # Single source of truth for all portfolio content
src/
├── components/       # React section components (Hero, About, Skills, …)
│   └── ThemeToggle.jsx
├── constants/        # Configuration constants (name, contact, navigation)
├── context/
│   └── ThemeContext.jsx  # Light/dark state, persistence, OS preference
├── lib/
│   └── db.js         # Data-fetch layer reading public/db.json
├── App.jsx           # Main application component
├── main.jsx          # Entry point
└── index.scss        # Bootstrap + Tailwind + theme tokens
```

## Editing content

`public/db.json` holds the profile, skills, experience, projects, and education.
Edit that file and everything on the page updates — it is served as a static asset,
so changes need no rebuild, just a refresh. It should always match the current resume.

## Features

- Light/dark toggle in the navbar — remembers the choice, follows the OS until one is made
- Responsive design with Framer Motion animations and a Three.js hero
- Timeline of 20 years of engineering roles plus AI training & evaluation engagements
- Searchable, filterable skills grid grouped by core-competency category
- Project showcase
- Contact form (submissions are logged to the console — `db.json` is read-only)
- Resume download

## Technologies Used

- React 18 + Vite
- Tailwind CSS (primary utility layer)
- Bootstrap 5 (Reboot, grid, components)
- Font Awesome 7 + React Icons
- Framer Motion
- React Three Fiber / drei

## Theming

`src/index.scss` defines two sets of CSS variables — the default set is light, and
a `dark` class on `<html>` swaps them. Tailwind exposes those variables as semantic
colours (`bg-canvas`, `text-heading`, `text-body`, `text-muted`, `border-hairline`
and `veil`, an overlay that inverts per theme), so components carry no `dark:`
variants: changing the variables re-themes everything at once.

`ThemeContext` persists the choice to `localStorage` and otherwise follows
`prefers-color-scheme`. A small inline script in `index.html` applies the theme
before first paint to avoid a flash.

## Bootstrap + Tailwind

Bootstrap is compiled from its SCSS partials rather than loaded from
`dist/bootstrap.min.css`, and `bootstrap/scss/utilities/api` is deliberately left
out. Bootstrap's utility layer emits `!important` and shares class names with
Tailwind (`.p-4`, `.mb-4`, `.border`, `.rounded`, `.shadow`, `.text-muted`,
`.text-body`), so the prebuilt bundle silently overrides Tailwind site-wide —
Bootstrap's `.p-4` is 1.5rem against Tailwind's 1rem. Skipping the utilities API
keeps Reboot, the grid and the components while leaving Tailwind in charge of
utilities. Add new Bootstrap partials to the import block at the top of
`src/index.scss`; avoid re-adding `utilities/api`.

## Setup

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open http://localhost:5173

## Data

There is no backend. `src/lib/db.js` fetches `public/db.json` once per page load and
exposes the same async getters the components already use, so swapping in a real API
later means changing only that one file.

## Known gaps

The resume lists placeholder GitHub and LinkedIn handles, so those links are set to
`null` in `public/db.json` and are hidden site-wide until real URLs are filled in.
