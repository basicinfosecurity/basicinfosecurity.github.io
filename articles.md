---
layout: default
title: Articles
---

<div class="page-default">
  <h1 style="font-family:'Spectral SC',Georgia,serif;font-size:22px;font-weight:600;
              letter-spacing:.05em;color:var(--fg);margin-bottom:28px;">
    All Articles
  </h1>

  <ul class="post-list">
    {%- for post in site.posts -%}
    <li class="post-item">
      {%- if post.image and post.image != "" -%}
      <a class="entry-cover" href="{{ post.url | prepend: site.baseurl }}" tabindex="-1" aria-hidden="true">
        <img src="{{ '/assets/img/' | append: post.image | prepend: site.baseurl }}"
             alt="{{ post.title }}"
             loading="lazy">
      </a>
      {%- endif -%}

      <span class="post-date">{{ post.date | date: "%d %B %Y" }}</span>

      <a class="post-title-link" href="{{ post.url | prepend: site.baseurl }}">
        {{ post.title }}
      </a>

      <div class="post-meta">
        {%- if post.pinned -%}
        <span class="pin">★ pinned</span>
        <span class="sep">·</span>
        {%- endif -%}
        {%- if post.categories.first -%}
        <span>{{ post.categories.first }}</span>
        <span class="sep">·</span>
        {%- endif -%}
        <span class="reading-time-item"
              data-words="{{ post.content | number_of_words }}"></span>
      </div>

      {%- if post.tags.size > 0 -%}
      <div class="post-tags">
        {%- for tag in post.tags -%}
        <a class="tag" href="{{ '/tags#' | append: tag | prepend: site.baseurl }}">{{ tag }}</a>
        {%- endfor -%}
      </div>
      {%- endif -%}
    </li>
    {%- endfor -%}
  </ul>
</div>

<script>
  document.querySelectorAll('.reading-time-item').forEach(function(el) {
    var words = parseInt(el.getAttribute('data-words'), 10) || 0;
    var mins  = Math.max(1, Math.round(words / 200));
    el.textContent = mins + ' min read';
  });
</script>
