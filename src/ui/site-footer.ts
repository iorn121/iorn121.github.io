export class SiteFooter extends HTMLElement {
  connectedCallback(): void {
    const year = new Date().getFullYear();
    this.innerHTML = [
      '<footer style="margin:40px 0; text-align:center; color:#f1f1f1;">',
      `  <small>&copy; ${year} Iori Portfolio</small>`,
      '</footer>',
    ].join('\n');
  }
}

customElements.define('site-footer', SiteFooter);
