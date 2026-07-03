import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const sites = [
  {
    folder: "chapter-websites",
    title: "MathsForge",
    siteName: "mathsforge",
    description: "Main launcher for the separate Class 12 MathsForge chapter websites.",
  },
  {
    folder: "chapter-1-relations-functions",
    chapter: 1,
    title: "Relations and Functions",
    siteName: "relations-functions-forge",
    summary: "Relations, functions, composition, inverse functions, and binary operations.",
  },
  {
    folder: "chapter-2-inverse-trigonometric-functions",
    chapter: 2,
    title: "Inverse Trigonometric Functions",
    siteName: "inverse-trigonometric-functions-forge",
    summary: "Principal values, domains, ranges, graphs, identities, and simplification.",
  },
  {
    folder: "chapter-3-matrices",
    chapter: 3,
    title: "Matrices",
    siteName: "matrices-forge",
    summary: "Matrix types, operations, transpose, symmetric matrices, and inverse.",
  },
  {
    folder: "chapter-4-determinants",
    chapter: 4,
    title: "Determinants",
    siteName: "determinants-forge",
    summary: "Properties, cofactors, adjoint, inverse, area, and equations.",
  },
  {
    folder: "chapter-5-continuity-differentiability",
    chapter: 5,
    title: "Continuity and Differentiability",
    siteName: "continuity-differentiability-forge",
    summary: "Continuity, differentiability, chain rule, implicit, and logarithmic differentiation.",
  },
  {
    folder: "chapter-6-application-of-derivatives",
    chapter: 6,
    title: "Application of Derivatives",
    siteName: "application-of-derivatives-forge",
    summary: "Rates, tangents, normals, monotonicity, maxima, minima, and approximation.",
  },
  {
    folder: "chapter-7-integrals",
    chapter: 7,
    title: "Integrals",
    siteName: "integrals-forge",
    summary: "Indefinite integrals, substitution, partial fractions, integration by parts, and definite integral properties.",
  },
  {
    folder: "chapter-8-applications-of-integrals",
    chapter: 8,
    title: "Applications of Integrals",
    siteName: "applications-of-integrals-forge",
    summary: "Area under curves, area between curves, axis-based limits, symmetry, and exam diagrams.",
  },
  {
    folder: "chapter-9-differential-equations",
    chapter: 9,
    title: "Differential Equations",
    siteName: "differential-equations-forge",
    summary: "Order, degree, formation, variable separable equations, homogeneous equations, and linear differential equations.",
  },
  {
    folder: "chapter-11-three-dimensional-geometry",
    chapter: 11,
    title: "Three Dimensional Geometry",
    siteName: "three-dimensional-geometry-forge",
    summary: "Direction cosines, direction ratios, lines, planes, angles, distances, and 3D intersection logic.",
  },
  {
    folder: "chapter-12-linear-programming",
    chapter: 12,
    title: "Linear Programming",
    siteName: "linear-programming-forge",
    summary: "Objective functions, constraints, feasible regions, corner points, optimization, and word-problem modelling.",
  },
  {
    folder: "chapter-13-probability",
    chapter: 13,
    title: "Probability",
    siteName: "probability-forge",
    summary: "Sample spaces, events, conditional probability, independence, total probability, and Bayes theorem.",
  },
];

const chapterSites = sites.filter((site) => site.chapter);

const netlifyToml = `[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`;

function netlifyUrl(siteName) {
  return `https://${siteName}.netlify.app/`;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function updateChapterHtml(site) {
  const file = path.join(root, site.folder, "index.html");
  let html = read(file);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${site.title} Forge is a premium static Class 12 Maths chapter website from MathsForge.">`,
  );
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${site.title} Forge | MathsForge</title>`);
  html = html.replace(`<h1>${site.title}</h1>`, `<h1>${site.title} Forge</h1>`);
  html = html.replaceAll("works on GitHub Pages without paid hosting", "works on Netlify and GitHub Pages without paid hosting");
  html = html.replace(
    /<footer class="footer"><div class="wrap">[\s\S]*?<\/div><\/footer>/,
    `<footer class="footer"><div class="wrap"><b>${site.title} Forge</b><p>Part of MathsForge. Static, free, Netlify-ready, and GitHub Pages-ready. No backend, database, paid API, or subscription.</p></div></footer>`,
  );
  write(file, html);
}

function updateChapterReadme(site) {
  const file = path.join(root, site.folder, "README.md");
  const githubUrl = `https://armaankapoor-ship-it.github.io/mathsforge-chapter-${site.chapter}/`;
  const repoUrl = `https://github.com/armaankapoor-ship-it/mathsforge-chapter-${site.chapter}`;
  const content = `# ${site.title} Forge

A separate, static Class 12 Mathematics learning website for **Chapter ${site.chapter}: ${site.title}**. It is part of **MathsForge** and is built as a frontend-only project, so it can be shared publicly through Netlify or GitHub Pages without paid hosting, paid APIs, databases, or subscriptions.

Netlify website name:

\`\`\`text
${site.siteName}
\`\`\`

Netlify public website:

\`\`\`text
${netlifyUrl(site.siteName)}
\`\`\`

GitHub Pages public website:

\`\`\`text
${githubUrl}
\`\`\`

GitHub repository:

\`\`\`text
${repoUrl}
\`\`\`

## What Is Included

- Topic notes for ${site.title}
- Formula sheet
- Derivation and proof bank
- 2D SVG diagram bank
- Interactive simulations
- 20 chapter-specific detailed interactive 3D models
- Practice question bank with answer reveal
- Revision dashboard
- Printable revision sheet
- Responsive premium UI inspired by MathsForge
- Netlify deployment config
- GitHub Pages deployment workflow

## Run Locally

Open \`index.html\` in any modern browser.

No install, backend, database, paid API, or build step is required for local viewing.

## Project Structure

\`\`\`text
.
├── index.html
├── README.md
├── netlify.toml
├── .nojekyll
└── .github/
    └── workflows/
        └── pages.yml
\`\`\`

## How to Publish This Website for Free Using Netlify

1. Create a free Netlify account at \`https://www.netlify.com\`.
2. Click **Add new site**.
3. Choose **Deploy manually** for the fastest upload, or choose **Import an existing project** to connect the GitHub repository.
4. If deploying manually, drag this chapter folder into Netlify.
5. If importing from GitHub, select the matching repository and use these settings:

\`\`\`text
Site name: ${site.siteName}
Base directory: leave blank
Build command: leave blank
Publish directory: .
\`\`\`

6. Click **Deploy**.
7. After deployment, Netlify will show the public link:

\`\`\`text
${netlifyUrl(site.siteName)}
\`\`\`

## How to Publish This Website for Free Using GitHub Pages

1. Create a free GitHub account at \`https://github.com\`.
2. Create a new public repository named \`mathsforge-chapter-${site.chapter}\`.
3. Upload or push all files from this folder into that repository.
4. Install dependencies: this project has no dependencies.
5. Build the project: no build command is required because this is a static website.
6. Open the repository on GitHub, then go to **Settings > Pages**.
7. Under **Build and deployment**, choose **GitHub Actions** as the source.
8. Wait for the Pages workflow to finish.
9. Copy the public website link shown by GitHub Pages.

Expected public link:

\`\`\`text
${githubUrl}
\`\`\`

## Update the Website Later

Edit \`index.html\`, save the file, commit the change, and push it to GitHub. GitHub Pages will publish the updated website automatically after the workflow runs.

For Netlify, either push the update to the connected GitHub repository or open Netlify and redeploy the updated chapter folder manually.

## Add More Chapters Later

Create a new folder or repository for each chapter, copy this structure, replace the chapter content in \`index.html\`, update the README title, update the Netlify site name to \`chapter-name-forge\`, and publish it with Netlify or GitHub Pages.
`;
  write(file, content);
}

function updateLauncher() {
  const file = path.join(root, "chapter-websites", "index.html");
  const cards = chapterSites.map((site) => {
    const chapter = String(site.chapter).padStart(2, "0");
    return `<a href="${netlifyUrl(site.siteName)}"><span>${chapter}</span><h2>${site.title} Forge</h2><p>${site.summary}</p></a>`;
  }).join("");
  const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="MathsForge is the main launcher for separate Class 12 Mathematics chapter websites on Netlify.">
  <title>MathsForge</title>
  <style>
    :root{color-scheme:light;--ink:#111827;--text:#526170;--line:rgba(15,23,42,.1);--panel:rgba(255,255,255,.84);--brand:#145c70;--bg:#f7fbfc}
    *{box-sizing:border-box}body{margin:0;min-width:320px;background:linear-gradient(180deg,#f7fbfc,#e8f6f8 72%,#f7fbfc);color:var(--ink);font-family:Manrope,Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{width:min(1120px,100%);margin:auto;padding:80px 22px}.eyebrow{color:var(--brand);font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.16em}h1{max-width:860px;margin:12px 0 14px;font-size:clamp(2.7rem,7vw,5rem);line-height:.98;font-weight:950}p{max-width:760px;color:var(--text);font-weight:700;line-height:1.7}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:34px}a{display:grid;gap:12px;min-height:230px;border:1px solid var(--line);border-radius:10px;background:var(--panel);box-shadow:0 18px 48px rgba(15,23,42,.08);padding:22px;color:inherit;text-decoration:none;transition:.18s ease}a:hover{transform:translateY(-3px);border-color:rgba(20,92,112,.32)}a span{display:grid;width:42px;height:42px;place-items:center;border-radius:10px;background:#111827;color:white;font-weight:950}a h2{margin:0;font-size:1.22rem}a p{margin:0;font-size:.95rem}@media(max-width:900px){.grid{grid-template-columns:1fr 1fr}}@media(max-width:640px){.grid{grid-template-columns:1fr}}
  </style>
</head>
<body><main><div class="eyebrow">MathsForge / Class 12 Mathematics</div><h1>MathsForge</h1><p>The main launcher for separate premium chapter websites. Each chapter opens as its own Netlify site with notes, formulas, diagrams, simulations, 20 chapter-specific 3D models, practice, revision dashboard, and print sheet.</p><div class="grid">${cards}</div></main></body></html>
`;
  write(file, content);

  const readme = `# MathsForge

Main launcher for the separate Class 12 MathsForge chapter websites.

Netlify website name:

\`\`\`text
mathsforge
\`\`\`

Netlify public website:

\`\`\`text
${netlifyUrl("mathsforge")}
\`\`\`

## Chapter Websites

${chapterSites.map((site) => `- [${site.title} Forge](${netlifyUrl(site.siteName)})`).join("\n")}

Each chapter is a standalone static website with MathsForge-style design, GitHub Pages compatibility, Netlify config, and 20 chapter-specific 3D models.

## How to Publish This Launcher for Free Using Netlify

1. Create a free Netlify account at \`https://www.netlify.com\`.
2. Click **Add new site**.
3. Choose **Deploy manually**.
4. Drag the \`chapter-websites\` folder into Netlify.
5. Set the site name to \`mathsforge\`.
6. Copy the public link:

\`\`\`text
${netlifyUrl("mathsforge")}
\`\`\`
`;
  write(path.join(root, "chapter-websites", "README.md"), readme);
}

for (const site of sites) {
  write(path.join(root, site.folder, "netlify.toml"), netlifyToml);
  if (site.chapter) {
    updateChapterHtml(site);
    updateChapterReadme(site);
  }
}

updateLauncher();

console.log(`Prepared ${sites.length} Netlify-ready static sites.`);
