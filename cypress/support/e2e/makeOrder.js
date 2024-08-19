describe('Order management', () => {
    
    let orderId;

    // Get pet inventory
    it('Should get pet inventories by status', () => {
        const getInventory = {
            method: 'GET',
            url: '/store/inventory'
        };
        cy.request(getInventory).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // Make an order
    it('Should place an order for a pet', () => {
        const makeOrder = {
            method: 'POST',
            url: '/store/order',
            body: {
                petId: 1,
                quantity: 2,
                shipDate: new Date().toISOString(),
                status: "placed",
                complete: true
            }
        };
        cy.request(makeOrder).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            orderId = response.body.id;
        });
    });

    // Get order details
    it('Should get the order details by id', () => {
        cy.wrap(orderId).should('not.be.undefined').then(() => {
            const getOrderDetail = {
                method: 'GET',
                url: `/store/order/${orderId}`
            };
            cy.request(getOrderDetail).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.eq(orderId);
            });
        });
    });

    // Delete the order
    it('Should delete the order by id', () => {
        cy.wrap(orderId).should('not.be.undefined').then(() => {
            const deleteOrder = {
                method: 'DELETE',
                url: `/store/order/${orderId}`
            };
            cy.request(deleteOrder).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});
