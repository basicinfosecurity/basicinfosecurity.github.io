---
layout: default
title: Contact
---

<div class="page-default">

  <h1 style="font-family:'Spectral SC',Georgia,serif;font-size:22px;font-weight:600;
              letter-spacing:.05em;color:var(--fg);margin-bottom:28px;">
    Contact
  </h1>

  <div class="post-body">
    <p>The best way to reach me is by email:</p>
    <p>
      <a href="mailto:{{ site.social.email }}">{{ site.social.email }}</a>
    </p>
    <p>You can also find me on:</p>
    <ul>
      {%- if site.social.github -%}
      <li>
        <a href="https://github.com/{{ site.social.github }}"
           target="_blank" rel="noopener noreferrer">
          GitHub — {{ site.social.github }}
        </a>
      </li>
      {%- endif -%}
      {%- if site.social.linkedin -%}
      <li>
        <a href="{{ site.social.linkedin }}"
           target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </li>
      {%- endif -%}
    </ul>
  </div>

</div>
