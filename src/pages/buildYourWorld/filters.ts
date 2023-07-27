import { gsap } from 'gsap';

import { createElementPlaceholder } from './createElementPlaceholder';

export class FilterItem {
  public element: HTMLElement;
  private themes: string[] = [];
  private isVisible: boolean;
  private placeholder: Comment;
  private clone: HTMLElement;
  private parseDataAttribute(attribute: string): string[] {
    const attr = this.element.dataset[attribute];
    return attr ? attr.split(', ') : [];
  }

  constructor(element: HTMLElement) {
    this.element = element;
    this.themes = this.parseDataAttribute('themes');
    this.isVisible = true;
    this.placeholder = createElementPlaceholder();
    this.clone = this.element.cloneNode(true) as HTMLElement;
  }

  // Private method to show the element
  private showElement() {
    this.placeholder.replaceWith(this.element);
    this.isVisible = true;
    gsap.to(this.element, {
      opacity: 1,
      translateY: '0em',
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  // Private method to hide the element
  private hideElement() {
    gsap.to(this.element, {
      opacity: 0,
      translateY: '1em',
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        this.element.replaceWith(this.placeholder);
        this.isVisible = false;
      },
    });
  }

  // Private method to determine if the element is shown in a given theme
  public themeVisibility(theme: string) {
    if (this.themes.includes('Global')) return;

    const shouldShow = this.themes.includes(theme);
    if (shouldShow && !this.isVisible) {
      this.showElement();
    } else if (!shouldShow && this.isVisible) {
      this.hideElement();
    }
  }
}
