const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('pets route Testing', () => {
  it('should fail to create a pet with no name', async () => {
    const res = await request(app).post('/pets').send({
      age: '3',
      color: 'white',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('name-required');
  });
  it('should fail to create a pet with no age', async () => {
    const res = await request(app).post('/pets').send({
      name: 'buzzo',
      color: 'black',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('age-required');
  });

  it('should create a pet with given pet data', async () => {
    const petData = {
      name: 'Rocky',
      age: 4,
      color: 'Brown-red',
    };
    const res = await request(app).post('/pets').send(petData);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(petData.name);
    expect(res.body.age).to.equal(petData.age);
    expect(res.body.color).to.equal(petData.color);
  });

  it('get Pets data', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).to.equal(200);
  });

  it('Delete a pet ', async() => {
    const res = await request(app).delete('/pets/Rocky');
    expect(res.status).to.equal(200);
});

});