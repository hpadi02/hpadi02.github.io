# Portfolio — Cursor Development Spec
# Repo: hpadi02/hpadi02.github.io
# Deploy target: https://hpadi02.github.io (GitHub user site)

---

## Context

This is a personal portfolio site for Hugo Padilla Cuadros, a CS senior graduating May 2026
from Texas A&M San Antonio with a 3.84 GPA and an Undergraduate Certificate in AI Systems
Development. The site targets recruiters and hiring managers at software engineering, AI, and
data science companies. It must read as professional, confident, and human — not AI-generated.

The repo name is hpadi02.github.io. This makes it a GitHub user site, which means:
- GitHub Pages serves from the main branch directly, not a gh-pages branch
- The live URL is https://hpadi02.github.io with no subdirectory
- The homepage field in package.json must be https://hpadi02.github.io exactly
- The deploy workflow must push the build output to the main branch root,
  OR the project uses a docs/ folder on main, OR we use GitHub Actions to push
  to main. The recommended approach here is GitHub Actions pushing to main.

---

## Tech Stack

- React 18 (Create React App)
- Plain CSS modules per component (no Tailwind, no CSS-in-JS)
- No UI library dependencies
- Google Fonts via public/index.html link tag
- gh-pages package NOT used — deployment is handled by GitHub Actions only
- Node 20

---

## package.json Requirements

```json
{
  "name": "hpadi02-portfolio",
  "version": "1.0.0",
  "private": true,
  "homepage": "https://hpadi02.github.io",
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

No predeploy or deploy scripts. The gh-pages package is not used.

---

## GitHub Actions Workflow

File path: .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          publish_branch: main
          force_orphan: true
```

IMPORTANT: publish_branch is main, not gh-pages. This is a user site.
The force_orphan: true flag replaces the main branch contents with the build
output on each deploy. The source code lives in the workflow itself and in git history.

---

## Design System

### Fonts (load in public/index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
```

### CSS Variables (src/index.css)

```css
:root {
  --bg:             #080808;
  --bg2:            #111111;
  --bg3:            #1a1a1a;
  --surface:        #161616;
  --border:         rgba(255, 255, 255, 0.07);
  --border-bright:  rgba(255, 255, 255, 0.15);

  --white:   #f5f0eb;
  --muted:   #6b6b6b;
  --accent:  #e8ff47;
  --accent2: #ff6b35;

  --font-display: 'Bebas Neue', sans-serif;
  --font-mono:    'DM Mono', monospace;
  --font-body:    'DM Sans', sans-serif;

  --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --radius:     4px;
}
```

### Font Usage Rules

Bebas Neue    — display headings, hero name, card titles, stat numbers only
DM Mono       — labels, tags, metadata, navigation links, code
DM Sans       — all body copy, descriptions, paragraph text

Never introduce a fourth font.

### Color Rules

--accent is for highlights, active states, key labels, and the cursor blink.
Do not use it for body text or large background fills.
--bg and --bg2 alternate for section backgrounds to create depth without borders.
Text is always --white or --muted. Never pure #ffffff or #000000.

---

## Project Structure

```
src/
  App.js
  index.js
  index.css              CSS variables and global resets
  components/
    Navbar.js
    Navbar.css
    Hero.js
    Hero.css
    About.js
    About.css
    Projects.js
    Projects.css
    Skills.js
    Skills.css
    Contact.js
    Contact.css
  data/
    projects.js          Single source of truth for all project content
public/
  index.html
.github/
  workflows/
    deploy.yml
```

---

## Section Specifications

### Navbar

- Fixed position, full width
- Transparent until user scrolls 40px, then dark background with backdrop blur
- Left: logo "HP." — Bebas Neue, accent dot
- Right: nav links in DM Mono uppercase + GitHub link styled as a button
- Mobile: hamburger menu, slide-in drawer from right
- Links scroll to section anchors: About, Projects, Skills, Contact

### Hero

- Full viewport height, centered content left-aligned
- Background: dot grid using radial-gradient, masked to fade at edges
- Two decorative blur orbs — one top-left in accent color at low opacity,
  one bottom-right in accent2 at low opacity. CSS keyframe float animation.
- Eyebrow line: short horizontal rule + "Available for new grad roles" in DM Mono
- Main name: "Hugo" on line 1, "Padilla" on line 2 — Bebas Neue, large
  "Padilla" uses outline text treatment (-webkit-text-stroke, transparent fill)
- Typewriter effect below name cycling through:
  "Software Engineer", "AI Developer", "Full Stack Builder", "CS Graduate"
  Implemented in vanilla JS with useEffect. Typing at 70ms per character,
  deleting at 40ms, pause of 1800ms at full word. Cursor blinks using CSS animation.
- Bio paragraph in DM Sans, muted color, max-width 520px
- Three buttons: primary (accent fill, dark text), two ghost (border, muted text)
  Links: View Projects scrolls to projects section, GitHub opens new tab, LinkedIn opens new tab
- Stats row: 3.84 GPA, 6+ Projects, AI Certificate
  Bebas Neue numbers, DM Mono labels, separated by 1px vertical rules
- Scroll indicator at bottom center: thin line animating scale

### About

- Two-column grid: left is text, right is timeline
- Left column heading: "Builder. Engineer. Problem Solver."
  "Problem Solver." uses outline text treatment
- Two short paragraphs about background and work authorization
- Badges row: "No sponsorship required", "San Antonio TX", "Open to remote"
  Pill-shaped, border style, DM Mono
- Right column timeline:
  Year in DM Mono, accent dot with vertical connecting line, label in Bebas Neue,
  detail in DM Mono muted
  Entries: 2026 Graduating, 2025 Certificate, 2024 HackUTD Win, 2023 Research

### Projects

- Section heading: "What I've Built" with "Built" in outline treatment
- Filter buttons generated dynamically from tag values across all projects
  Active filter has accent background and dark text
  Inactive filters have border and muted text
- Grid: auto-fill columns, minimum 320px per card, 1.5px gap
  The grid itself has a border and uses the gap as a visual divider
- Each card:
  - Header row: code icon left, GitHub/live links right
  - Title in Bebas Neue
  - Subtitle in DM Mono accent color, uppercase, small
  - Description in DM Sans muted
  - Tech chips: small pill shapes, dark background, border, DM Mono
  - Tag chips: border in accent color at low opacity, accent text, DM Mono uppercase
  - Featured badge positioned absolute top-right for highlight projects
- Hover state: card background lightens slightly

### Skills

- Alternate background section (--bg2)
- Grid of skill groups, auto-fill columns, minimum 200px each
- Each group: category label in DM Mono accent uppercase, rule below,
  then list items in DM Mono with a 4px dot left of each item
- Hover on item: text brightens to --white, dot turns accent color
- Categories: Languages, AI/ML, Web and Mobile, Data and Infra, Security and Networks

### Contact

- Section heading: "Let's Connect" with "Connect" in outline treatment
- Short paragraph about availability and no sponsorship requirement
- Contact list: three rows separated by borders, each row has label left and value right
  Hover: row shifts slightly right, value text turns accent color
  Links: email, LinkedIn, GitHub

### Footer

- Single row, border top
- Left: "HP." logo
- Right: "Built with React. Deployed on GitHub Pages." in DM Mono muted

---

## Projects Data Shape (src/data/projects.js)

```js
const projects = [
  {
    id: 1,
    title: "HERMES",
    subtitle: "HackUTD — PNC Track Winner",
    description: "Full-stack financial assistant using React, FastAPI, MongoDB, and PyTorch. Real-time NLP-driven spending insights and anomaly detection.",
    tags: ["AI/ML", "Full Stack", "Hackathon"],
    tech: ["React", "FastAPI", "MongoDB", "PyTorch"],
    github: "https://github.com/hpadi02/hermes",
    live: null,
    highlight: true,
  },
  // add more following this exact shape
];

export default projects;
```

Tag values in use: "AI/ML", "Full Stack", "Hackathon", "iOS", "Mobile",
"Security", "IoT", "Hardware", "Data Science"

Do not add new tag values without also having at least one project using them.
The filter bar auto-generates from tags, so orphan tags create dead filter buttons.

---

## Animations

All animations are CSS only unless noted.

Page load: fadeUp keyframe with staggered animation-delay on hero children.
Delays go from 0.1s to 0.6s in 0.1s increments. Nothing delays past 0.8s.

Typewriter: useEffect with setTimeout. See Hero section spec above.
This is the one JavaScript animation. Everything else is CSS.

Transitions: all interactive transitions use --transition (0.25s cubic-bezier).
Do not use linear or ease-in-out for hover states.

Scroll indicator: CSS keyframe scaling the line element, 2s duration infinite.

Orbs: CSS keyframe translate, 12 to 16 second duration, ease-in-out infinite.
Keep orb opacity low. They are atmosphere, not focal points.

No scroll-triggered animations. No intersection observer. Keep it simple.
A recruiter with a slow machine should not see janky repaints.

---

## Mobile Breakpoints

768px: single column layouts, reduced padding (5rem to 1.5rem horizontal)
900px: About section switches from two-column to stacked

Touch targets must be at least 44px tall.
Hamburger menu drawer slides in from right, 260px wide.
Hero name scales with clamp() — never overflows on 375px viewport.

---

## What Not to Do

Do not use emojis anywhere in the UI or copy.
Do not use Inter, Roboto, or system fonts.
Do not use purple gradients on white backgrounds.
Do not use progress bars or percentage charts for skill levels.
Do not add scroll-triggered animation libraries (AOS, GSAP, Framer Motion).
Do not use localStorage or sessionStorage.
Do not auto-play any media.
Do not add more than five sections. The current five are the right amount.
Do not use hyphens to connect adjective phrases in UI copy.
Do not use semicolons in short-form UI text.
Do not write placeholder text like "Lorem ipsum" or "Coming soon".
Do not use external icon libraries. The one GitHub SVG in the project cards
is inlined. Keep it that way.

---

## Copy Rules

Write like a person who built the thing, not a resume generator.

Good: "Built a spending analyzer using PyTorch and FastAPI. Won the PNC track at HackUTD."
Bad:  "Leveraged cutting-edge NLP capabilities to deliver actionable financial insights."

Good: "Predicts soccer player market values using Logistic Regression and Decision Tree classifiers."
Bad:  "Developed a machine learning solution demonstrating strong proficiency in data science."

Project descriptions are one to two sentences. Name the specific tech. Include an outcome if one exists.
The GitHub repo is where depth lives. The card is a door, not a wall of text.

---

## URLs to Update Before First Deploy

These values must be set correctly or the site will have broken links.

package.json homepage:          https://hpadi02.github.io
Hero GitHub button:             https://github.com/hpadi02
Hero LinkedIn button:           https://linkedin.com/in/hugopadillacuadros
Contact email:                  your real email address
Contact LinkedIn:               https://linkedin.com/in/hugopadillacuadros
Contact GitHub:                 https://github.com/hpadi02
Each project github field:      real repo URL under github.com/hpadi02

---

## Deploy Checklist

Before pushing to main for the first time:

1. homepage in package.json is https://hpadi02.github.io
2. All project github URLs point to real repos under hpadi02
3. Contact email is a real address
4. No console.log statements left in component files
5. npm start runs without errors locally
6. npm run build completes without errors locally
7. .github/workflows/deploy.yml is committed and publish_branch is main

After pushing:

1. Go to the repo on GitHub and click the Actions tab
2. Watch the Deploy to GitHub Pages workflow run
3. When it completes, go to Settings then Pages
4. Confirm the source is set to Deploy from a branch, branch main, folder root
5. Visit https://hpadi02.github.io — allow 60 to 90 seconds for DNS propagation
   on the first deploy

---

## Local Development

```bash
npm install
npm start
```

The dev server opens at localhost:3000 with hot reload.
You do not need to build locally before deploying.
The workflow builds for you on every push to main.
