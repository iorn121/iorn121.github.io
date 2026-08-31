export class SiteFooter extends HTMLElement {
  connectedCallback(): void {
    const year = new Date().getFullYear();
    this.innerHTML = [
      '<footer>',
      `  <small>&copy; ${year} Iori Portfolio</small>`,
      '</footer>',
    ].join('\n');
  }
}

customElements.define('site-footer', SiteFooter);
