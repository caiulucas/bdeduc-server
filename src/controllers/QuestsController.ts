import { Request, Response } from 'express';
import knex from '../database';

export default class QuestController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const quest = await knex('quests').where({ id }).first();
    return response.json(quest);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const quests = await knex('quests');

    return response.json(quests);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, content, level } = request.body;
    const now = new Date();

    await knex('quests').insert({
      title,
      content,
      level,
    });

    return response.status(200).send();
  }
}
