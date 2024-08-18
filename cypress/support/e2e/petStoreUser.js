describe('Petstore API Inventory Testing', () =>{
    
    //creat new user
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
    it('Create a user', () => {
        cy.request(createUser).as('createUser');
        cy.get('@createUser').then(createUser => {
            expect(createUser.status).to.eq(200);
        });
    });

    //get user detail
    const userDetails = {
        method: 'GET',
        url: `/user/${Cypress.env('username')}`
    };
    it('Get user details', () => {
        cy.request(userDetails).as('userDetails');
        cy.get('@userDetails').then(userDetails => {
            expect(userDetails.status).to.eq(200);
            expect(userDetails.body.username).to.eq(Cypress.env('username'));
        });
    });

    //login user
    const loginUser = {
        method : 'GET',
        url : '/user/login/',
        qs : {
            username : Cypress.env('username'),
            password : Cypress.env('password')
        }
    }
    it('Login registered user', () => {
        cy.request(loginUser).as('loginUser');
        cy.get('@loginUser').then(loginUser => {
            expect(loginUser.status).to.eq(200);
          });
    });

    //update user 
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
    }
    it('Update user', () => {      
        cy.request(updatedUser).as('updateUser');
        cy.get('@updateUser').then(updateUser => {
            expect(updateUser.status).to.eq(200);
        });
    });

    // logout user
    it('Logout user', () => {
        cy.request('GET', '/user/logout').as('logoutUser');
        cy.get('@logoutUser').then(logoutUser => {
            expect(logoutUser.status).to.eq(200);
        });
    });

    // delete user
    const deleteUser = {
        method: 'DELETE',
        url: `/user/${Cypress.env('username')}`
    };
    
    it('Delete user', () => {
        cy.request(deleteUser).as('deleteUser');
        cy.get('@deleteUser').then(deleteUser => {
            expect(deleteUser.status).to.eq(200);
        });
    });
    
})