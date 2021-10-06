describe('Login', function () {
  it('Should complete Login', function () {
    cy.visit('http://localhost:3000');
    cy.findByLabelText(/Email Address/).type('michael.scott@dunder.co.uk');
    cy.findByLabelText(/Password/).type('123456');
    cy.findByRole('button', { name: 'Sign In' }).click();
  });
});
