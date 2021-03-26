import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default class QuestAwnserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { sql, editable } = request.body;
    const manager = getManager();

    const isSelect = sql.split(' ')[0];

    if (!editable && isSelect.toLowerCase() !== 'select') {
      return response
        .status(400)
        .json({ err: 'Isso não é um comando de select' });
    }

    try {
      const result = await manager.query(sql);
      console.log(result);

      return response.json(result);
    } catch (err) {
      return response
        .status(400)
        .json({ err: 'Erro de SQL ou tabela inexistente' });
    }
  }
}
