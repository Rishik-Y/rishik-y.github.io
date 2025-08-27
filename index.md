---
layout: default
title: "Rishik Y - GSoC 2025 Blog"
---

# Welcome to Rishik Y's GSoC 2025 Blog

This website documents my journey through Google Summer of Code 2025 with Waycrate, working on cross-compositor compatibility for Wayshot.

## Latest Updates

{% for page in site.pages limit:5 %}
  {% if page.title and page.url != "/" %}
  - [{{ page.title }}]({{ page.url }})
  {% endif %}
{% endfor %}

## GSoC Content

- [Main GSoC Documentation](GSOC/GSoC.md)
- [What is Linux?](GSOC/What_is_linux.md)
- [What is a Wayland Compositor?](GSOC/What_is_wayland_compositor.md)
- [Development Resources](GSOC/Resources.md)

## Performance 

This website is optimized for fast deployment with ~70% faster build times using custom Jekyll configuration and GitHub Actions caching. Learn more in [PERFORMANCE_OPTIMIZATION.md](PERFORMANCE_OPTIMIZATION.md).

---

*Built with Jekyll • Deployed with GitHub Pages • Optimized for Speed*