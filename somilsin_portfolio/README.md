<div align="center">

# 🌌 My Interactive Portfolio

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![My Portfolio](https://img.shields.io/badge/By-Somil%20Singh-6E40C9?style=for-the-badge)

</div>

[← Learning Archive](../README.md)

I built this portfolio with React and TanStack Start. I use chapters to present my work and interactive scenes to make the site feel personal. The source includes particle effects, a skills scene and links to my projects.

## Run my site locally

```bash
bun install --frozen-lockfile
bun run dev
```

## Build the published version

I keep this source in Learning Archive. The public website assets are hosted with my other websites in Artificial Intelligence.

```bash
GH_PAGES_BASE=/Artificial-Intelligence/portfolio/ bun run build:static
```

The static build writes `dist/client` with an index page and a fallback page. The root category workflow builds a preview artifact for this folder. The website is published at [my portfolio](https://somilsin.github.io/Artificial-Intelligence/portfolio/) after the generated assets are verified.

I retain the Lovable project instructions and published history in the repository backup. Repository consolidation changes the source location. Existing external editor integrations need their repository target updated before they can sync future edits.
