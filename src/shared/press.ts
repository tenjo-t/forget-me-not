export type EventListener = (en: Event) => void;

export type PressEventListener = {
  pointer: (e: PointerEvent) => void;
  key: (e: KeyboardEvent) => void;
};

export const isValidKeyboardEvent = (e: KeyboardEvent): boolean => {
  const { key, target } = e;
  const element = target as HTMLElement;
  const { tagName, isContentEditable } = element;
  // Accessibility for keyboards. Space and Enter only.
  return (
    (key === 'Enter' || key === ' ') &&
    tagName !== 'INPUT' &&
    tagName !== 'TEXTAREA' &&
    isContentEditable !== true
  );
};

export const isEnter = (e: KeyboardEvent): boolean => e.key === 'Enter';
export const isSpace = (e: KeyboardEvent): boolean => e.key === ' ';
export const isMainButton = (e: PointerEvent): boolean => e.button === 0;
