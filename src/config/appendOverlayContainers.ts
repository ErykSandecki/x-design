// types
import { HTMLContainerId } from 'types/enums';

// utils
import { createHtmlElement, enumToArray, getCssVariable } from 'utils';

export const appendOverlayContainers = (): void => {
  const ids = enumToArray<HTMLContainerId>(HTMLContainerId);

  ids.forEach((id) => {
    const element = createHtmlElement('div', { id });

    element.style.position = 'fixed';
    element.style.zIndex = getCssVariable(`--xd-zindex-${id}`);
    document.body.appendChild(element);
  });
};
