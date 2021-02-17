import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default class QuestAwnserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { sql } = request.body;
    const manager = getManager();

    try {
      const result = await manager.query(sql);
      return response.json(result);
    } catch (err) {
      return response
        .status(400)
        .json({ err: 'Erro de SQL ou tabela inexistente' });
    }
  }
}
