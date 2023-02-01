const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
// const pokemon = {
//   name: 'Pikachu',
// };

describe('Pokemon routes', () => {
  before(async () => {
    try {
      await conn.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
  beforeEach(async () => {
    try {
      await Pokemon.sync({ force: true });
    } catch (error) {
      console.error('Error creating pokemon:', error);
    }
  });
  describe('GET /pokemons', async () => {
    it('Debe devolver status "200"', async () => {
      const response = await agent.get('/pokemons');
      expect(response.status).to.equal(200);
    });

    it('Debe devolver un objeto con la propiedad "succes"', async () => {
      const response = await agent.get('/pokemons');
      expect(response.body).to.have.property('succes');
    });

    it('La propiedad "succes" debe ser un objeto', async () => {
      const response = await agent.get('/pokemons');
      expect(response.body.succes).to.be.an('object');
    });

    it('El objeto "succes" de tener la propiedades "api" y "db"', async () => {
      const response = await agent.get('/pokemons');
      expect(response.body.succes).to.have.property('api');
      expect(response.body.succes).to.have.property('db');
    });

    it('"api" y "db" Deben ser array', async () => {
      const response = await agent.get('/pokemons');
      expect(response.body.succes.api).to.be.an('array');
      expect(response.body.succes.db).to.be.an('array');
    });

    it('La propiedad "api" debe contener Pokemones', async () => {
      const response = await agent.get('/pokemons');
      expect(response.body.succes.api).to.be.an('array');
      expect(response.body.succes.api[0]).to.have.property('id');
      expect(response.body.succes.api[0].id).to.be.an('number');
      expect(response.body.succes.api[2]).to.have.property('id');
      expect(response.body.succes.api[2].id).to.be.an('number');
    });

    it('La propiedad "db" debe contener Pokemones', async () => {
      await agent.post('/pokemons').send({
        name: 'salamandra',
        tagTypes: ['electric'],
        stats: {
          healt: 100,
          attack: 55,
          defense: 40,
          speed: 90,
        },
        sprites: 'https://picsum.photos/200/300',
        height: 4,
        weight: 60,
      });

      const response = await agent.get('/pokemons');

      expect(response.body.succes.db).to.be.an('array');
      expect(response.body.succes.db[0]).to.have.property('id');
      expect(response.body.succes.db[0].id).to.equal('S1');
      expect(response.body.succes.db[0].name).to.equal('salamandra');
    });
  });

  describe('GET /pokemons?name=value', async () => {
    it('Debe devolver status "200"', async () => {
      const response = await agent.get('/pokemons?name=pikachu');
      expect(response.status).to.equal(200);
    });
  });

  describe('POST /pokemons', () => {
    it('Debe crear un pokemon', (done) => {
      agent
        .post('/pokemons')
        .send({
          name: 'apotapo',
          tagTypes: ['electric'],
          stats: {
            healt: 100,
            attack: 55,
            defense: 40,
            speed: 90,
          },
          sprites: 'https://picsum.photos/200/300',
          height: 4,
          weight: 60,
        })
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
