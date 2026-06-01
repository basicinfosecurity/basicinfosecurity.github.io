source "https://rubygems.org"

# GitHub Pages gem pins Jekyll and all plugins to versions
# that GitHub Pages supports. Use this for zero-config deployment.
gem "github-pages", group: :jekyll_plugins

# Local development only — not needed on GitHub Pages
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
end

# Windows / JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", platforms: [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
