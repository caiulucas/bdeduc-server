import { Request, Response } from 'express';
import db from '../database';

export default class QuestController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const quest = await db.query('select * from quests where id = ?;', [
      String(id),
    ]);

    return response.json(quest.rows[0]);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const quests = await db.query('select * from quests;');

    return response.json(quests.rows);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, content, level } = request.body;
    await db.query(
      'insert into quests (title, content, level) values (?, ?, ?);',
      [String(title), String(content), String(level)],
    );

    return response.status(200).send();
  }
}
