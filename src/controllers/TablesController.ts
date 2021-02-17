import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default class TablesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const manager = getManager();
    const sql = `SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public' 
                ORDER BY table_name;`;

    const tables = await manager.query(sql);

    return response.json(tables);
  }
}
