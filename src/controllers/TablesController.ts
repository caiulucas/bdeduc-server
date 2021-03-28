import { Request, Response } from 'express';
import db from '../database';

export default class TablesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const tables = await db.query(
      `SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name != 'quests'
                ORDER BY table_name;`,
    );

    return response.json(tables.rows);
  }
}
