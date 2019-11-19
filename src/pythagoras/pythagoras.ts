import { Subject } from 'rxjs';

interface ElementBinding {
  node: Node;
  property: string;
}

export class Pythagoras {
  bindings: ElementBinding[] = [];
  handlers: [];

  constructor(private root: HTMLElement, template: string, private component: any) {
    root.innerHTML = template;

    this.parseTemplate();
    this.digest();

    Pythagoras.globalDigestRequests.subscribe(() => this.digest());
  }

  private parseTemplate() {
    this.parse(this.root);
  }

  private parse(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      this.parseTextNode(node);
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      this.parseElementNode(node as Element);
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      this.parse(node.childNodes[i]);
    }
  }

  private parseTextNode(textNode: Node) {
    const text = textNode.nodeValue;

    const maybePropertyBinding = text.match(/^{{\s*(\w+)\s*}}$/);

    if (maybePropertyBinding) {
      const property = maybePropertyBinding[1];
      this.bindings.push({ node: textNode, property });
    }
  }

  private parseElementNode(element: Element) {
    if (element.hasAttribute('(click)')) {
      const callback = element.getAttribute('(click)');
      element.addEventListener('click', event => this.handleClick(event as MouseEvent, callback));
    }
  }

  private handleClick(event: MouseEvent, callback: string) {
    if (this.component[callback]) {
      this.component[callback](event);

      this.digest();
    }
  }

  /**
   * Sync component state to DOM
   */
  private digest() {
    for (const binding of this.bindings) {
      binding.node.nodeValue = this.component[binding.property];
    }
  }

  static globalDigestRequests = new Subject<void>();
  static triggerDigest() {
    Pythagoras.globalDigestRequests.next();
  }
}
