const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl : 'https://petstore.swagger.io/v2',
        specPattern : "cypress/support/e2e",
        supportFile : false
    },
    env: {
        username : "tsan27",
        password : "12345",
        petName : "doggie",
        status : "available",
        petID : "9223372016900023000",
    }
})