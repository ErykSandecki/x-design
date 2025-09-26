export const scrollIntoView = (
  behavior: ScrollBehavior,
  element: Element,
): void => {
  element.scrollIntoView({ behavior });
};
