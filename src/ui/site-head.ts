export class SiteHead extends HTMLElement {
  connectedCallback(): void {
    const titleAttr = (this.getAttribute('title') || 'Iori Portfolio').trim();
    this.ensureTitle(titleAttr);
    this.ensureViewport('width=device-width, initial-scale=1,shrink-to-fit=no');
    this.ensurePreconnect('https://fonts.gstatic.com');
    this.ensureFavicon('/favicon.svg', 'image/svg+xml');
  }

  private ensureTitle(title: string): void {
    if (document.title !== title) {
      document.title = title;
    }
  }

  private ensureViewport(content: string): void {
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    if (meta.content !== content) {
      meta.content = content;
    }
  }

  private ensurePreconnect(href: string): void {
    const exists = document.head.querySelector<HTMLLinkElement>(
      `link[rel="preconnect"][href="${href}"]`,
    );
    if (!exists) {
      const l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = href;
      document.head.appendChild(l);
    }
  }

  private ensureStylesheet(href: string): void {
    const exists = document.head.querySelector<HTMLLinkElement>(
      `link[rel="stylesheet"][href="${href}"]`,
    );
    if (!exists) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      document.head.appendChild(l);
    }
  }

  private ensureFavicon(href: string, type: string): void {
    let icon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.href = href;
    icon.type = type;
  }
}

customElements.define('site-head', SiteHead);
