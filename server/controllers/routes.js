
import indexController from './indexController';
import postItNotesController from './postItNotesController';

export default function (app) {
  app.get('/', indexController.index);

  app.get('/post_it_note', postItNotesController.index);
  app.get('/post_it_note/:id', postItNotesController.get);
  app.post('/post_it_note', postItNotesController.add);
  app.patch('/post_it_note/:id', postItNotesController.edit);
  app.delete('/post_it_note/:id', postItNotesController.remove);
}
