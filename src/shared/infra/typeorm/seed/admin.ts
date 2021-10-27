import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuidV4();
  const password = await hash('admin123', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license) VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`,
  );

  await connection.close();
}

create().then(() => console.log('User admin created!'));
