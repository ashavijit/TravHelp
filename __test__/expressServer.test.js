const { expect } = require('@jest/globals')
const request = require('supertest')


describe('Testing express server', () => {

    const app = require('../src/server/server')

    it('get mock object', async() => {

        const response = await request(app).get('/test')
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('message')

    })
})
