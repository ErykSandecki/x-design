// types
import { HTMLContainerId } from 'types/enums';

// utils
import { createHtmlElement, enumToArray } from 'utils';

export const appendOverlayContainers = (): void => {
  const ids = enumToArray<HTMLContainerId>(HTMLContainerId);

  ids.forEach((id) => {
    const element = createHtmlElement('div', { id });
    document.body.appendChild(element);
  });
};
