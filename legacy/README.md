# Legacy

`index.html` is the original single-file landing page this project was built
from — the whole site in one file, no build step.

It is kept for reference only. Nothing serves it, nothing imports it, and it is
no longer the source of truth. The Next.js app in `app/` and `components/`
replaced it; `app/globals.css` is this file's `<style>` block, ported verbatim.
