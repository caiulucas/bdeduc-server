// Update with your config settings.

module.exports = {
  client: 'pg',
  connection: {
    database: 'bd-educ',
    user: 'postgres',
    password: 'postgres',
  },
  migrations: {
    directory: `${__dirname}/src/database/migrations`,
  },
};
