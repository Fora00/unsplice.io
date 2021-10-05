const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('Integration tests', () => {

  it('should retrieve the module correctly', (done) => {

    request
    .post('/graphql')
    .send({ query: '{ getModuleList(programId: "614cc0d37bd239a523fd2b26") {name} }'})
    .expect(200)
    .end((err,res) => {
      if (err) return done(err);
      done();
  })
});
})
