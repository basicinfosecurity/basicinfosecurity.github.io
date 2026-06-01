# pleasedonthack.me — Theme

A Jekyll blog combining:
- **no-style-please** aesthetic (system monospace, minimal chrome)
- **Long Haul** features (drop cap, feature image, prev/next nav with thumbnails)
- **Chirpy** functionality (sidebar TOC, categories, tags, reading time, dark/light toggle)
- **Spectral** Roman serif + **Fira Code** monospace typography
- **One Dark** syntax highlighting (VS Code palette)

---

## Installation

```bash
# 1. Clone your repo
git clone https://github.com/basicinfosecurity/basicinfosecurity.github.io
cd basicinfosecurity.github.io

# 2. Copy all theme files into the repo (overwrite existing)
#    Do NOT delete your _posts/ folder

# 3. Install dependencies
bundle install

# 4. Run locally
bundle exec jekyll serve --livereload
# → open http://localhost:4000
```

---

## File structure

```
├── _config.yml               ← site settings
├── _layouts/
│   ├── default.html          ← base HTML shell
│   ├── home.html             ← paginated post list + sidebar
│   └── post.html             ← post with TOC sidebar + prev/next
├── _includes/
│   ├── head.html             ← <head>, fonts, SEO, theme init
│   ├── header.html           ← site nav + feature image logic
│   ├── footer.html           ← links + theme.js script tag
│   ├── sidebar.html          ← recent posts, categories, tags
│   ├── toc.html              ← sticky TOC for post pages
│   └── post-nav.html         ← prev/next with thumbnails
├── _sass/
│   ├── _variables.scss       ← all design tokens
│   ├── _base.scss            ← CSS vars, reset, body
│   ├── _header.scss          ← header + feature image
│   ├── _layout.scss          ← page grids, sidebar, responsive
│   ├── _posts.scss           ← post list, prose, tags, pagination
│   ├── _code.scss            ← code blocks, One Dark Rouge tokens
│   ├── _toc.scss             ← sticky TOC sidebar
│   └── _footer.scss          ← footer
├── css/
│   └── main.scss             ← imports all partials
├── assets/
│   ├── js/
│   │   └── theme.js          ← dark/light toggle, TOC, reading time, copy
│   └── img/
│       └── posts/            ← put feature images here
├── _posts/                   ← your existing posts (keep as-is)
├── index.html
├── articles.md
├── about.md
├── contact.md
├── Gemfile
└── .github/workflows/pages-deploy.yml
```

---

## Writing posts

Minimal front matter:

```yaml
---
layout: post
title:  "My post title"
date:   2025-03-14 10:00:00 +0800
categories: [web exploitation]
tags: [sqli, web, python]
---
```

With all options:

```yaml
---
layout: post
title:  "SQL injection: blind boolean attack"
date:   2025-03-14 10:00:00 +0800
categories: [web exploitation]
tags: [sqli, web, python, owasp]
description: "Short excerpt shown on the index page."
pinned: true

# Feature image — becomes the full-bleed header background.
# Also used as thumbnail in prev/next post navigation.
# Path is relative to the site root (put images in /assets/img/posts/).
feature-image: /assets/img/posts/my-image.jpg
feature-image-credit: "Artist Name — Work Title · License"
---
```

### Code blocks

Use standard fenced code blocks with a language identifier:

````markdown
```python
def hello():
    print("hello world")
```
````

Rouge handles highlighting automatically. All major languages are
supported: `python`, `bash`, `shell`, `sql`, `ruby`, `javascript`,
`c`, `cpp`, `java`, `go`, `rust`, and many more.

---

## Dark / light mode

- **Default:** controlled by `theme_mode` in `_config.yml`
  - `auto` — follows OS preference (recommended)
  - `light` — always light
  - `dark`  — always dark
- **User toggle:** the moon/sun icon in the header. Choice is saved
  to `localStorage` and persists across visits.

---

## Customisation

All colours, fonts, and spacing are in `_sass/_variables.scss`.
The most common changes:

```scss
// Change fonts
$font-serif: 'Your Font', Georgia, serif;

// Change accent / link colour
$light-link: #8b0000;   // dark red in light mode
$dark-link:  #e07070;   // lighter in dark mode

// Change max content width
$max-width:      880px;   // home + about pages
$max-width-post: 1060px;  // post pages (wider for TOC sidebar)
```

---

## GitHub Pages deployment

Push to `master`. The Actions workflow (`.github/workflows/pages-deploy.yml`)
builds Jekyll and deploys automatically.

Make sure GitHub Pages source is set to **GitHub Actions**:
`Settings → Pages → Source → GitHub Actions`
