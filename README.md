# MathsForge - Class 12 Vector Algebra Visual Learning Platform

MathsForge is a free, public-website-ready learning platform for **Class 12 Mathematics: Vectors / Vector Algebra**.

It is built for CBSE Boards, JEE Main, JEE Advanced foundation, and students who want visual understanding for maths and physics vectors.

## What Is Included

- Premium responsive public learning website
- 44 section-wise topic notes
- Formula sheet with meaning, examples, and traps
- 13 derivations with CBSE writing style and JEE shortcuts
- 35 original 2D diagram plans with SVG visuals
- Three.js based 3D Vector Lab
- Interactive simulations
- 390 original practice questions
- Revision dashboard
- Printable one-page revision sheet
- GitHub Pages deployment workflow
- Local JSON content files for notes, formulas, diagrams, and questions

## Separate Chapter Websites

Standalone Class 12 Maths websites are included:

- [Chapter 1 - Relations and Functions](chapter-1-relations-functions/index.html)
- [Chapter 2 - Inverse Trigonometric Functions](chapter-2-inverse-trigonometric-functions/index.html)
- [Chapter 3 - Matrices](chapter-3-matrices/index.html)
- [Chapter 4 - Determinants](chapter-4-determinants/index.html)
- [Chapter 5 - Continuity and Differentiability](chapter-5-continuity-differentiability/index.html)
- [Chapter 6 - Application of Derivatives](chapter-6-application-of-derivatives/index.html)
- [Chapter 7 - Integrals](chapter-7-integrals/index.html)
- [Chapter 8 - Applications of Integrals](chapter-8-applications-of-integrals/index.html)
- [Chapter 9 - Differential Equations](chapter-9-differential-equations/index.html)
- [Chapter 11 - Three Dimensional Geometry](chapter-11-three-dimensional-geometry/index.html)
- [Chapter 12 - Linear Programming](chapter-12-linear-programming/index.html)
- [Chapter 13 - Probability](chapter-13-probability/index.html)

Each standalone chapter website now includes 20 chapter-specific interactive 3D models with draggable, zoomable, frontend-only canvas views.

You can also open the small launcher page:

```text
chapter-websites/index.html
```

## Netlify Website Names

The separate chapter websites are also prepared for free Netlify deployment. The main launcher should use the site name:

```text
mathsforge
```

Each chapter website uses the chapter name plus `forge`:

- `relations-functions-forge`
- `inverse-trigonometric-functions-forge`
- `matrices-forge`
- `determinants-forge`
- `continuity-differentiability-forge`
- `application-of-derivatives-forge`
- `integrals-forge`
- `applications-of-integrals-forge`
- `differential-equations-forge`
- `three-dimensional-geometry-forge`
- `linear-programming-forge`
- `probability-forge`

Every chapter folder includes a `netlify.toml` file and can be published as a static Netlify site with no build command and `.` as the publish directory.

## Free Tools Used

- React + Vite
- Tailwind CSS
- KaTeX
- Three.js
- Lucide icons
- Local JSON files
- GitHub Pages

No paid hosting, paid domain, paid database, paid API, subscription, or backend is required.

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── scripts/generate-data.mjs
├── src
│   ├── components
│   ├── data
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## How to Run the Project Locally

Install Node.js first from the official Node.js website if it is not already installed.

Then open the project folder in a terminal and run:

```bash
pnpm install
pnpm run dev
```

Open the local website link printed by Vite, usually:

```text
http://localhost:5173/
```

## How to Build the Project

```bash
pnpm run build
```

The final static website is created in the `dist/` folder.

To preview the production build:

```bash
pnpm run preview
```

## How to Publish This Website for Free Using GitHub Pages

Follow these beginner-friendly steps to make the website public and shareable with classmates, teachers, and students.

### 1. Create a free GitHub account

Go to [https://github.com](https://github.com) and create a free account.

### 2. Create a new public repository

1. Click the `+` button in the top-right corner.
2. Click `New repository`.
3. Give it a name, for example:

```text
mathsforge
```

4. Choose `Public`.
5. Click `Create repository`.

### 3. Upload or push the project files

Beginner upload method:

1. Open your new repository on GitHub.
2. Click `Add file`.
3. Click `Upload files`.
4. Drag and drop all files from this project folder.
5. Click `Commit changes`.

Command-line method:

```bash
git init
git add .
git commit -m "Initial MathsForge website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY-NAME` with your own GitHub details.

### 4. Install dependencies

On your own computer, run:

```bash
pnpm install
```

GitHub Actions will also install dependencies automatically when publishing.

### 5. Build the project

To test the production build on your computer:

```bash
pnpm run build
```

### 6. Configure GitHub Pages

1. Open your GitHub repository.
2. Click `Settings`.
3. Click `Pages` in the left sidebar.
4. Under `Build and deployment`, choose `GitHub Actions`.

### 7. Publish the site

The included file `.github/workflows/deploy.yml` will build and publish the website automatically when you push to the `main` branch.

To publish manually:

1. Open the `Actions` tab.
2. Click `Deploy MathsForge to GitHub Pages`.
3. Click `Run workflow`.

### 8. Copy the public website link

After the workflow finishes, your public website link will look like:

```text
https://your-github-username.github.io/your-repository-name/
```

Example:

```text
https://armaankapoor-ship-it.github.io/mathsforge/
```

You can share this link with classmates, teachers, and students.

## How to Update the Website Later

1. Edit the files in the project.
2. Save your changes.
3. Run the website locally to check it:

```bash
pnpm run dev
```

4. Build once before publishing:

```bash
pnpm run build
```

5. Push the update to GitHub:

```bash
git add .
git commit -m "Update MathsForge content"
git push
```

GitHub Pages will automatically rebuild and update the public link.

## How to Edit Notes, Formulas, Diagrams, and Questions

The content is stored in local JSON files:

```text
src/data/sections.json
src/data/formulas.json
src/data/derivations.json
src/data/diagrams.json
src/data/questions.json
src/data/revision.json
```

You can edit these files directly.

For large updates, edit `scripts/generate-data.mjs`, then run:

```bash
node scripts/generate-data.mjs
```

This regenerates the JSON content banks.

## How to Add More Chapters Later

1. Create new JSON files inside `src/data/`, for example:

```text
matrices.json
determinants.json
threeDimensionalGeometry.json
```

2. Add chapter notes, formulas, derivations, diagrams, and questions.
3. Create or reuse React components inside `src/components/`.
4. Add the new chapter section in `src/App.jsx`.
5. Add the chapter link to the navigation list in `src/App.jsx`.
6. Keep the website static and frontend-only so it remains compatible with GitHub Pages.
7. Run:

```bash
pnpm run build
```

8. Push the changes to GitHub.

## Deployment Notes

The GitHub Actions workflow automatically sets the Vite base path to your repository name:

```text
/${repository-name}/
```

This is required for GitHub Pages project sites.

## Educational Disclaimer

MathsForge is an independent educational project. It is designed to support Class 12 CBSE and JEE preparation, but students should always refer to the current official syllabus, NCERT textbook, and exam instructions as the final authority.
