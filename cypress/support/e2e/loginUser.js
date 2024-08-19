describe('User login', () => {

    // Create new user
    it('Create a user', () => {
        const createUser = {
            method: 'POST',
            url: '/user',
            body: {
                "id": 0,
                "username": Cypress.env('username'),
                "firstName": "tsania",
                "lastName": "qurrota",
                "email": "tsan@gmail.com",
                "password": Cypress.env('password'),
                "phone": "0822341213",
                "userStatus": 0
            }
        };
        cy.request(createUser).as('createUser');
        cy.get('@createUser').then(createUser => {
            expect(createUser.status).to.eq(200);
        });
    });

    // Get user details
    it('Get user details', () => {
        const userDetails = {
            method: 'GET',
            url: `/user/${Cypress.env('username')}`
        };
        cy.request(userDetails).as('userDetails');
        cy.get('@userDetails').then(userDetails => {
            expect(userDetails.status).to.eq(200);
            expect(userDetails.body.username).to.eq(Cypress.env('username'));
        });
    });

    // Login user
    it('Login registered user', () => {
        const loginUser = {
            method: 'GET',
            url: '/user/login/',
            qs: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
            }
        };
        cy.request(loginUser).as('loginUser');
        cy.get('@loginUser').then(loginUser => {
            expect(loginUser.status).to.eq(200);
        });
    });

    // Update user
    it('Update user', () => {
        const updatedUser = {
            method: 'PUT',
            url: `/user/${Cypress.env('username')}`,
            body: {
                "id": 0,
                "username": Cypress.env('username'),
                "firstName": "tsania",
                "lastName": "qurrota",
                "email": "tsan@gmail.com",
                "password": Cypress.env('password'),
                "phone": "0822341213",
                "userStatus": 0
            }
        };
        cy.request(updatedUser).as('updateUser');
        cy.get('@updateUser').then(updateUser => {
            expect(updateUser.status).to.eq(200);
        });
    });

    // Logout user
    it('Logout user', () => {
        cy.request('GET', '/user/logout').as('logoutUser');
        cy.get('@logoutUser').then(logoutUser => {
            expect(logoutUser.status).to.eq(200);
        });
    });

    // Delete user
    it('Should delete the user by username', () => {
        const deleteUser = {
            method: 'DELETE',
            url: `/user/${Cypress.env('username')}`
        };
        cy.request(deleteUser).as('deleteUser');
        cy.get('@deleteUser').then(deleteUser => {
            expect(deleteUser.status).to.eq(200);
        });
    });

});
