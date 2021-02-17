import { Router } from 'express';

import TablesController from '../controllers/TablesController';
import ColumnsController from '../controllers/ColumnsController';
import QuestsController from '../controllers/QuestsController';
import QuestAwnserController from '../controllers/QuestAwnserController';

const tablesController = new TablesController();
const columnsController = new ColumnsController();
const questsController = new QuestsController();
const questAwnserController = new QuestAwnserController();

const routes = Router();

routes.get('/tables', tablesController.list);

routes.get('/columns', columnsController.list);

routes.get('/quest', questsController.show);
routes.get('/quests', questsController.list);
routes.post('/quests', questsController.create);

routes.post('/awnser', questAwnserController.create);

routes.post('/select', (request, response) => {
  const { selectedColumns, table, conditions } = request.body;

  const parsedSelectedColumns = selectedColumns.join(', ');
  const query = `SELECT ${parsedSelectedColumns} FROM ${table} WHERE ${conditions}`;

  return response.json(query);
});

export default routes;
