import { Request, Response } from 'express';
import db from '../database';

export default class QuestAwnserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { sql, editable } = request.body;
    const isSelect = sql.split(' ')[0];

    if (!editable && isSelect.toLowerCase() !== 'select') {
      return response
        .status(400)
        .json({ err: 'Isso não é um comando de select' });
    }

    try {
      const result = await db.query(sql);

      return response.json(result.rows);
    } catch (err) {
      return response
        .status(400)
        .json({ err: 'Erro de SQL ou tabela inexistente' });
    }
  }
}
