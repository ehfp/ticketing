import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

// declare global {
//   function signin(id?: string): string[]
// }

declare global {
  function signin(id?: string): Promise<string[]>
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51MxahkD894ssR9gPDDiPyenuf74utTwHFPdkG0yr8iJVP8CuxQpGalCEt5j8A4Z2F0kMPP9kCYTp1C0Q9O0KJC4J002ZyxY8sU';

let mongo : any;
jest.setTimeout(60000);

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  console.log('beforeAll => process.env.JWT_KEY:' + process.env.JWT_KEY);

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  
  const collections = await mongoose.connection.db.collections();

  for(let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async (id?: string) => {
  // const payload = {
  //   id: id || new mongoose.Types.ObjectId().toHexString(),
  //   email: 'test@test.com'
  // };

  // console.log('global.signin => process.env.JWT_KEY:' + process.env.JWT_KEY);

  // const token = jwt.sign(payload, process.env.JWT_KEY!);
  // const session = { jwt: token };
  // const sessionJSON = JSON.stringify(session);
  // const base64 = Buffer.from(sessionJSON).toString('base64');

  // return [`express:sess=${base64}`];

  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};