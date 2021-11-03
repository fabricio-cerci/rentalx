import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin123', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license) 
      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should to be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin123',
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category Supertest');
  });
});
