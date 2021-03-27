import { Request, Response } from 'express';
import knex from '../database';

export default class TablesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const tables = await knex.raw(
      `SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name != 'quests'
                ORDER BY table_name;`,
    );

    // const tables = await manager.query(sql);

    return response.json(tables.rows);
  }
}
