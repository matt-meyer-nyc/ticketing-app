import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async function name() {
  /*
		Note: SuperTest does not automatically store/pass cookie data like browser or Postman would
		b/c of this, need to manually pull off cookie from initial signup response, and then set it when attempting to retrieve info from current user
	

  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
		.expect(201);
		

  // mannually pull off cookie
	const cookie = authResponse.get('Set-Cookie');
	*/

  // above abstracted out in reusable way with global methos set on NodeJS
  // in /test/setup.ts file, where this method/property is set to return cookie promise
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticatd', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
