# personal-website-threejs

Personal site for [Murat Ermiş](https://github.com/murat-ermis) — a single
bilingual page built with the Next.js App Router, exported as static HTML and
published on GitHub Pages.

The hero scene shows a developer typing at their desk. After about thirteen
seconds they push the chair aside, get up and run through jumping jacks, side
stretches, forward folds, squats and arm circles, then sit back down and the
loop starts over.

| | |
| --- | --- |
| Turkish | `/` |
| English | `/en` |

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| 3D | Three.js + React Three Fiber + drei |
| Toolchain | mise (`mise.toml`) |
| CI/CD | GitHub Actions → GitHub Pages |

## Getting started

The Node version is pinned in `mise.toml`. If you do not have `mise`, follow the
install steps at [mise.jdx.dev](https://mise.jdx.dev).

```bash
mise install && npm ci && mise run dev
```

The site comes up on `http://localhost:3000`.

### Tasks

| Command | What it does |
| --- | --- |
| `mise run dev` | Development server |
| `mise run build` | Static export into `out/` |
| `mise run lint` | ESLint |
| `mise run typecheck` | Generates route types, then `tsc --noEmit` |
| `mise run ci` | Everything CI runs |

## Editing the content

Every visible string lives in [`content/site.ts`](content/site.ts), and each one
carries both a Turkish and an English version:

```ts
tagline: {
  tr: "...",
  en: "...",
},
```

Profile details, skills, projects, the experience timeline, the section list and
all page furniture are edited there — the components never hold copy of their
own. [`content/i18n.ts`](content/i18n.ts) holds the locale list and the paths
each locale is served from.

Each locale has its own root layout, so `<html lang>` is correct in the exported
HTML rather than being patched in the browser:

```
app/(tr)/layout.tsx   -> lang="tr", serves /
app/(en)/layout.tsx   -> lang="en", serves /en
```

## The 3D scenes

No external model files are ever downloaded; every scene is built from primitive
geometry. Six canvases run across the page:

| Component | Where | What it is |
| --- | --- | --- |
| [`HeroStage`](components/scene/HeroStage.tsx) | Hero | The developer, desk and workout loop |
| [`CodeRain`](components/scene/CodeRain.tsx) | "What I do" | Falling code bars behind the section |
| [`FlowNetwork`](components/scene/FlowNetwork.tsx) | About | Nodes with a pulse running the edges |
| [`AmbientField`](components/scene/AmbientField.tsx) | Tech | Drifting shards behind the whole section |
| [`TechOrbit`](components/scene/TechOrbit.tsx) | Tech | Technology shapes orbiting a core |
| [`ContactBeacon`](components/scene/ContactBeacon.tsx) | Contact | A knot that speeds up on hover |

Browsers cap how many WebGL contexts may be alive at once, so
[`LazyScene`](components/scene/LazyScene.tsx) mounts each canvas as it comes
within 300px of the viewport and unmounts it again once it is well out of view.
[`SceneFrame`](components/scene/SceneFrame.tsx) holds the settings they share.

### How the character is animated

There is no skeletal animation. [`poses.ts`](components/scene/poses.ts) defines a
timeline of phases; each phase is a function that returns target joint angles for
a moment in time, and
[`DeveloperCharacter`](components/scene/DeveloperCharacter.tsx) eases the current
pose toward that target with exponential damping. Transitions between phases come
out smooth without being written separately.

Leg angles are not hand-tuned. `solveLeg()` is a two-link IK solver: a pose says
where the ankle should be and the hip and knee angles follow from that, which is
what keeps the feet planted as the hip height changes through a stand-up or a
squat.

To add a movement, write a pose function in `poses.ts` and append it to `PHASES`.

### Notes

- `three` is pinned to `0.182.x`. Later releases deprecate the `THREE.Clock`
  that React Three Fiber still uses, which logs a warning on every canvas. The
  pin can go once R3F updates.
- Visitors with `prefers-reduced-motion: reduce` get the hero scene paused, and
  the decorative scenes render a single static frame.

## Deploying

Every push to `main` builds the site and publishes it through
[`deploy.yml`](.github/workflows/deploy.yml). Other branches and pull requests
are only verified, by [`ci.yml`](.github/workflows/ci.yml).

### First-time setup

1. In the repository settings, set **Settings → Pages → Build and deployment →
   Source** to **GitHub Actions**.
2. Push to `main`.

The site is published at
`https://murat-ermis.github.io/personal-website-threejs/`.

`basePath` is taken from whatever the `configure-pages` step reports, so moving
to a custom domain, or renaming the repository to `murat-ermis.github.io`,
needs no change here.
