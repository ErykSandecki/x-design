// types
import { HTMLContainerId } from 'types/enums';

// utils
import { createHtmlElement } from '../utils/dom/createHtmlElement';
import { enumToArray } from 'utils/transform/enumToArray';

export const appendOverlayContainers = (): void => {
  const ids = enumToArray<HTMLContainerId>(HTMLContainerId);

  ids.forEach((id) => {
    const element = createHtmlElement('div', { id });
    document.body.appendChild(element);
  });
};
