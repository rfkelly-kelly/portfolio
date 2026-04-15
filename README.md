# VSC Portfolio

Personal portfolio site for Reilly Kelly.

To publish to GitHub Pages:

1. Create a GitHub repo named `vsc-portfolio`.
2. Add `origin` remote and push `main` branch.
3. Enable GitHub Pages from `gh-pages` branch or `main` branch (root).

Example commands (use GitHub CLI `gh` if available):

```bash
# create remote repo and push (auth via gh)
gh repo create vsc-portfolio --public --source=. --remote=origin --push
# or manually:
git remote add origin https://github.com/<your-username>/vsc-portfolio.git
git branch -M main
git push -u origin main
```

To serve locally for testing:

```bash
# Python 3
python -m http.server 8000
# or using Node http-server
npx http-server -p 8000
```