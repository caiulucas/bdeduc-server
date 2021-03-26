import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default class QuestController {
  public async show(request: Request, response: Response): Promise<Response> {
    const manager = getManager();

    const { id } = request.query;

    const sql = `SELECT * FROM quests
                WHERE id = '${id}';`;
    const quests = await manager.query(sql);
    return response.json(quests[0]);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const manager = getManager();

    const sql = 'SELECT * FROM quests;';
    const quests = await manager.query(sql);

    return response.json(quests);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, content, level } = request.body;
    const now = new Date();

    const manager = getManager();

    const sql = `INSERT INTO quests (title, content, level, created_at, updated_at) 
                values ('${title}', '${content}', '${level}', '${now.toLocaleString()}', '${now.toLocaleString()}')`;

    await manager.query(sql);
    return response.status(200).send();
  }
}
