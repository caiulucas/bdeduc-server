import { Request, Response } from 'express';
import knex from '../database';

export default class ColumnsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { table } = request.query;

    const columns = await knex.raw(
      `SELECT attrelid::regclass AS tbl
                , attname            AS col
                , atttypid::regtype  AS datatype    
                FROM   pg_attribute
                WHERE  attrelid = ?::regclass
                AND    attnum > 0
                AND    NOT attisdropped;`,
      [`${table}`],
    );

    return response.json(columns.rows);
  }
}
