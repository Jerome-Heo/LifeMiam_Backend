const request = require('supertest');
const app = require("./app");


it('POST /users/signin', async () => {
    const res = await request(app).post('/users/signin').send({
      signin: 'test',
      password: 'test',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
   });

   it('POST /users/signin', async () => {
    const res = await request(app).post('/users/signin').send({
      signin: 'wronguser',
      password: 'test',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(false);
   });