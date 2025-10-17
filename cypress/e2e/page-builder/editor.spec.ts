// types
import { E2EAttribute } from 'types/e2e';
import { TColor } from 'types';

describe('editor 🖥️', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should has default states', () => {
    // @html
    cy.UITab('panel-mode', 'design').should('have.attr', E2EAttribute.active);
    cy.UITab('panel-mode', 'prototype').should('not.have.attr', E2EAttribute.active);
    cy.box('toolbar.default').should('have.attr', E2EAttribute.active);

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

  it('should change background color & alpha from picker', () => {
    // @parent
    cy.UISection('background').then(() => {
      // action
      cy.UIColorPicker('background', '#ffffff', '0');

      // @html
      cy.box('zoom-box-background-mask').shouldHaveBackground('#ffffff');

      // @store
      cy.getState('pageBuilder').then((state) => {
        expect((state.pages[state.currentPage].elements['-1'].background.properties as TColor).alpha).to.equal('0');
      });
    });
  });

  it('should change background color & alpha from input', () => {
    // @parent
    cy.UISection('background').then(() => {
      // action
      cy.UIColorInput('background', '#ffffff', '0');

      // @html
      cy.box('zoom-box-background-mask').shouldHaveBackground('#ffffff');

      // @store
      cy.getState('pageBuilder').then((state) => {
        expect((state.pages[state.currentPage].elements['-1'].background.properties as TColor).alpha).to.equal('0');
      });
    });
  });

  it('should change toggle visibiltiy by toggle button icon', () => {
    // @parent
    cy.UISection('background').then(() => {
      // action
      cy.UIButtonIcon('toggle-visibility').click();

      // @html
      cy.box('zoom-box-background-mask').should('not.be.visible');

      // @store
      cy.getState('pageBuilder').then((state) => {
        expect(state.pages[state.currentPage].elements['-1'].background.visible).to.equal(false);
      });
    });
  });
});
