import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default class ColumnsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { table } = request.query;
    const manager = getManager();

    const sql = `SELECT attrelid::regclass AS tbl
                , attname            AS col
                , atttypid::regtype  AS datatype    
                FROM   pg_attribute
                WHERE  attrelid = '${table}'::regclass
                AND    attnum > 0
                AND    NOT attisdropped;`;

    const columns = await manager.query(sql);

    return response.json(columns);
  }
}
