const keyboardEvent = (
  key: string,
  code: string,
  eventDetails = {},
  eventName = 'keypress'
): KeyboardEvent =>
  new KeyboardEvent(eventName, {
    ...eventDetails,
    bubbles: true,
    composed: true,
    cancelable: true,
    key,
    code,
  });

export const enterEvent = keyboardEvent('Enter', 'Enter');
export const spaceEvent = keyboardEvent(' ', 'Space');
export const spaceDownEvent = keyboardEvent(' ', 'Space', {}, 'keydown');
export const spaceUpEvent = keyboardEvent(' ', 'Space', {}, 'keyup');
export const gDownEvent = keyboardEvent('g', 'KeyG', {}, 'keydown');
export const gUpEvent = keyboardEvent('g', 'KeyG', {}, 'keyup');
export const arrowDownDownEvent = keyboardEvent(
  'ArrowDown',
  'ArrowDown',
  {},
  'keydown'
);
export const arrowUpDownEvent = keyboardEvent(
  'ArrowUp',
  'ArrowUp',
  {},
  'keydown'
);
export const homeDownEvent = keyboardEvent('Home', 'Home', {}, 'keydown');
export const endDownEvent = keyboardEvent('End', 'End', {}, 'keydown');

const pointerEvent = (button: number, eventName: string): PointerEvent =>
  new PointerEvent(eventName, {
    button,
    bubbles: true,
    composed: true,
    cancelable: true,
  });

export const mainButtonUpEvent = pointerEvent(0, 'pointerup');
export const mainButtonDownEvent = pointerEvent(0, 'pointerdown');
export const secondaryButtonUpEvent = pointerEvent(2, 'pointerup');
export const secondaryButtonDownEvent = pointerEvent(2, 'pointerdown');
