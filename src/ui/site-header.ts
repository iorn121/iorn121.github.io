export class SiteHeader extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    const currentPath = location.pathname.replace(/\/+$/, '');
    const isHome = currentPath === '' || currentPath.endsWith('/index.html');
    const parts: string[] = [];
    parts.push('<header>');
    parts.push(`  <h1 class="title"><a href="/" style="color: inherit;">Iori Portfolio</a></h1>`);
    if (isHome) {
      parts.push('  <div class="title-container">');
      parts.push('    <div class="filters bg-top">');
      parts.push('      <a class="filter" href="/?filter=ALL" data-filter="ALL">ALL</a>');
      parts.push('      <a class="filter" href="/?filter=Enjoy" data-filter="Enjoy">Enjoy</a>');
      parts.push('      <a class="filter" href="/?filter=Study" data-filter="Study">Study</a>');
      parts.push('      <a class="filter" href="/?filter=Create" data-filter="Create">Create</a>');
      parts.push('    </div>');
      parts.push('  </div>');
    }
    parts.push('</header>');
    this.innerHTML = parts.join('\n');
  }
}

customElements.define('site-header', SiteHeader);
