describe('Pet inventory management', () => {
    let petId; 

    // Create a new pet
    it('Should create a pet', () => {
        const createPet = {
            method: 'POST',
            url: '/pet',
            body: {
                "id": 0,
                "category": {
                  "id": 0,
                  "name": "string"
                },
                "name": Cypress.env('petName'),
                "photoUrls": [
                  "string"
                ],
                "tags": [
                  {
                    "id": 0,
                    "name": "string"
                  }
                ],
                "status": Cypress.env('status')
              }
        };
        cy.request(createPet).then((response) => {
            expect(response.status).to.eq(200);
            petId = response.body.id;
        });
    });

    // Find pet by status
    const statuses = ['available', 'pending', 'sold'];

    statuses.forEach((status) => {
        it(`Find pets with status: ${status}`, () => {
            const findByStatus = {
                method: 'GET',
                url: '/pet/findByStatus',
                qs: {
                    status: status
                }
            };
            cy.request(findByStatus).then((response) => {
                expect(response.status).to.eq(200);
                response.body.forEach((pet) => {
                    expect(pet.status).to.eq(status);
                });
            });
        });
    });

    // Find pet by id
    it('Should get the pet by id', () => {
        cy.wrap(petId).should('not.be.undefined').then(() => {
            const findById = {
                method: 'GET',
                url: `/pet/${petId}`
            };
            cy.request(findById).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.eq(petId);
            });
        });
    });

    // Update a pet in the store
    it('Should update the pet', () => { 
        cy.wrap(petId).should('not.be.undefined').then(() => {
            const updatedPet = {
                method: 'PUT',
                url: '/pet',
                body: {
                    "id": petId,
                    "name": "mochi",
                    "status": "available"
                }
            };
            cy.request(updatedPet).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.name).to.eq("mochi");
            });
        });
    });

    // Delete the pet
    it('Should delete the pet', () => {
        cy.wrap(petId).should('not.be.undefined').then(() => {
            const deletePet = {
                method: 'DELETE',
                url: `/pet/${petId}`
            };
            cy.request(deletePet).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});
