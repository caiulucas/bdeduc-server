import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

console.log(process.env.DATABASE_URL);

const db = new pg.Client(process.env.DATABASE_URL);

export default db;
