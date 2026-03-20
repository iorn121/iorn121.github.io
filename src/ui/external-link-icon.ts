import externalLinkSvg from '../icons/external-link.svg?raw';

/**
 * 新しいタブ／外部遷移を示す小さなアイコン。`class="inline-link__icon"` などでサイズを当てる。
 * 使い方: <external-link-icon class="inline-link__icon"></external-link-icon>
 */
export class ExternalLinkIcon extends HTMLElement {
  connectedCallback(): void {
    if (this.querySelector('svg')) {
      return;
    }
    this.innerHTML = externalLinkSvg;
  }
}

customElements.define('external-link-icon', ExternalLinkIcon);
