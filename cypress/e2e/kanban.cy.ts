describe('Kanban Board', () => {
  beforeEach(()=> {
    cy.visit('/');
    cy.window().then((win) => {
      (win as any).__confetti = cy.stub().as('confettiSpy');
    });
  });

  function createNewTicket(title:string, description:string ){
    cy.contains("+ New Ticket").click();
    cy.get('#ticketName').type(title);
    cy.get('#ticketDescription').type(description);
    cy.contains("OK").click();
  }

  it('should load the Kanban board', () => {
    cy.contains("Kanban Board").should('exist');
    cy.contains("+ New Ticket").should('exist');
    cy.contains("Backlog").should('exist');
    cy.contains("To Do").should('exist');
    cy.contains("In Progress").should('exist');
    cy.contains("Done").should('exist');
  })

  it('should create a new ticket', () => {
    createNewTicket("Mai is cute", "Yes, she is very cute");
    cy.get('#backlog-list').within(() => {
      cy.contains("Mai is cute").should('exist');
      cy.contains("Yes, she is very cute").should('exist');
    })
  });

  it('should move a ticket from Backlog to To Do', () => {

    createNewTicket("Task need to be done", "This task is important");


    cy.get('[aria-label="Backlog"] [cdkdrag]')
      .first()
      .trigger('mousedown', { button: 0, bubbles: true })
      .trigger('mousemove', { pageX: 50, pageY: 0 });

    cy.get('#todo-list')
      .trigger('mousemove', { position: 'center' })
      .trigger('mouseup', { button: 0, bubbles: true });


    cy.get('#todo-list').within(() => {
      cy.contains("Task need to be done").should('exist');
      cy.contains("This task is important").should('exist');
    })
  });

  it('should move a ticket from Backlog to In Progress', () => {

    createNewTicket("Task need to be done", "This task is important");


    cy.get('[aria-label="Backlog"] [cdkdrag]')
      .first()
      .trigger('mousedown', { button: 0, bubbles: true })
      .trigger('mousemove', { pageX: 50, pageY: 0 });

    cy.get('#in-progress-list')
      .trigger('mousemove', { position: 'center' })
      .trigger('mouseup', { button: 0, bubbles: true });


    cy.get('#in-progress-list').within(() => {
      cy.contains("Task need to be done").should('exist');
      cy.contains("This task is important").should('exist');
    })
  });

  it.only('should move a ticket from Backlog to Done and get confetti', () => {

    createNewTicket("Task need to be done", "This task is important");


    cy.get('[aria-label="Backlog"] [cdkdrag]')
      .first()
      .trigger('mousedown', { button: 0, bubbles: true })
      .trigger('mousemove', { pageX: 50, pageY: 0 });

    cy.get('#done-list')
      .trigger('mousemove', { position: 'center' })
      .trigger('mouseup', { button: 0, bubbles: true });

    cy.get('#done-list').within(() => {
      cy.contains("Task need to be done").should('exist');
      cy.contains("This task is important").should('exist');
    })

    cy.get("@confettiSpy").should("have.been.called");

  });


})
