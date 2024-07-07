export abstract class UIComponent<T extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  element: T;

  constructor(templateId: string) {
    // ターゲットのtemplate要素を取得
    this.templateEl = document.querySelector(templateId)!;

    // template要素を複製
    const clone = this.templateEl.content.cloneNode(true) as DocumentFragment;

    // template要素の子要素を取得
    this.element = clone.firstElementChild as T;
  }

  mount(selector: string) {
    const targetEl = document.querySelector(selector)!;
    targetEl.insertAdjacentElement("beforeend", this.element);
  }

  abstract setup(): void;
}
