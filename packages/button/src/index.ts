import {LitElement, unsafeCSS, property, TemplateResult, customElement, html} from 'lit-element';
import styles from './index.scss';
type Ty = 'primary' | 'danger' | 'warning' | null;

@customElement('ft-button')
class Button extends LitElement {
  static get styles() {
    return  [
      unsafeCSS(styles),
    ]
  };
  @property({type: String}) type: Ty = null;
  get classes(): string {
    const cls: string[] = ['button'];
    if (this.type) {
      cls.push(this.type);
    }
    return cls.join(' ');
  }
  render(): TemplateResult {
    return html`
      <button class="${this.classes}">
        <slot></slot>
      </button>
    `;
  }
}
export default Button;
declare global {
  interface HTMLElementTagNameMap {
    'ft-button': Button;
  }
}
