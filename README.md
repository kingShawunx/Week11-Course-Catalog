# Week 11 — TechyJaunt Course Catalog

A responsive course catalog built with React, Vite, and React Router v6. All
course content is read from the supplied local data file; the app does not use
an external API.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints a local URL after the development server starts.

## Routes and features

| Route | Page |
|---|---|
| `/` | Intro and grid of all courses |
| `/courses/:slug` | Course details, topics, and history-aware back button |
| `/category/:category` | Case-insensitive category-filtered course grid |
| Any unmatched URL | Friendly not-found page |

The shared navigation links to the home page and both course categories.
Course cards link to dynamic detail pages without a full page reload. Unknown
course slugs show a dedicated “Course not found” state. The original course
data in `src/data/courses.js` is unchanged.

## Production build

```bash
npm run build
npm run preview
```

## GitHub and deployment

To submit, create a GitHub repository and push this project, including
`package-lock.json`. Do not commit `node_modules/` or `dist/`; they are ignored.

For Vercel or Netlify, use `npm run build` as the build command and `dist` as
the output directory. Configure a single-page-app rewrite to `/index.html` so
direct visits to nested React Router routes work after deployment. Add the
deployment URL to the GitHub repository description.
