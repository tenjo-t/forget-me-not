export type EventListener = (en: Event) => void;

export type PressEventListener = {
  pointer: (e: PointerEvent) => void;
  key: (e: KeyboardEvent) => void;
};

const isValidKeyboardEvent = (el: HTMLElement): boolean => {
  const { tagName, isContentEditable } = el;

  return tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !isContentEditable;
};

export const isEnter = (e: KeyboardEvent): boolean =>
  isValidKeyboardEvent(e.target as HTMLElement) && e.key === 'Enter';
export const isSpace = (e: KeyboardEvent): boolean =>
  isValidKeyboardEvent(e.target as HTMLElement) && e.key === ' ';
export const isMainButton = (e: PointerEvent): boolean => e.button === 0;
