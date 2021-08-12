export type EventListener = (en: Event) => void;

export type PressEventListener = {
  pointer: (e: PointerEvent) => void;
  key: (e: KeyboardEvent) => void;
};

export const isValidKeyboardEvent = (event: KeyboardEvent): boolean => {
  const { key, target } = event;
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
