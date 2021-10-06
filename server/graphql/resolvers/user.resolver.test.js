const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('Integration tests', () => {

  it('the login should work', (done) => {

    request
    .post('/graphql')
    .send({ query: `mutation {
      login(email: "michael.scott@dunder.co.uk", password: "123456") {
        userInfo {
          id
        }
      }
    }`})
    .expect(200)
    .end((err,res) => {
      if (err) return done(err);
      const parsedRes = JSON.parse(res.text);
      const id = parsedRes.data.login.userInfo.id;
      expect(id).toEqual("61521ac8cc5587fbf14e3bcf")
      done();
  })
});
})