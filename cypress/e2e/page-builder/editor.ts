// types
import { E2EAttribute } from '../../../src/types/e2e';

describe('Editor 🖥️', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should has default states', () => {
    // @html
    cy.UITab('panel-mode', 'design').should('have.attr', E2EAttribute.active);
    cy.UITab('panel-mode', 'prototype').should('not.have.attr', E2EAttribute.active);

    // @store
    cy.getState('pageBuilder').then((state) => {
      expect(state.currentPage).to.equal('0');
    });
  });

  it('should switch to the prototype mode', () => {
    // action
    cy.UITab('panel-mode', 'prototype').click();

    // @html
    cy.UITab('panel-mode', 'design').should('not.have.attr', E2EAttribute.active);
    cy.UITab('panel-mode', 'prototype').should('have.attr', E2EAttribute.active);
  });
});
