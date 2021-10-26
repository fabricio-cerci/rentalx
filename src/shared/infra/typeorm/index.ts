import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;

  // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  newOptions.host = 'database_ignite';
  createConnection({
    ...options,
  });
});
