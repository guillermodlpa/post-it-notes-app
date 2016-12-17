
import mongoose from 'mongoose';
import PostItNoteModel from '../models/PostItNoteModel';
import { mongoDbUrl } from '../config';

/**
 * helper function to send back JSON encoded responses.
 */
function sendResponse(response, object) {
  const responseObject = object || {};
  responseObject.status = 'success'; // wont do anything when object is an array
  response.json(responseObject);
}
/**
 * helper function to send back JSON encoded ERROR responses.
 */
function sendError(response, errorCode, object) {
  response.json({
    status: 'error',
    code: errorCode,
    data: object,
  });
}

function index(req, res/* , next*/) {
  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;

  db.on('error', () => {
    sendError(res, 'errorOpeningDbConnection');
    db.close();
  });
  db.once('open', (/* callback*/) => {
    // find all.
    // eslint-disable-next-line array-callback-return
    PostItNoteModel.find((err, postItNotes) => {
      if (err) {
        sendError(res, 'errorWithFindPostItNotes');
      } else {
        sendResponse(res, postItNotes);
      }
      db.close();
    });
  });
}

function get(req, res/* , next*/) {
  const postItNoteId = req.params.id;

  // validate
  if (!postItNoteId) {
    sendError(res, 'emptyParams');
    return;
  }

  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;

  db.on('error', () => {
    sendError(res, 'errorOpeningDbConnection');
  });
  db.once('open', (/* callback*/) => {
    const conditions = {
      _id: postItNoteId,
    };
    // eslint-disable-next-line array-callback-return
    PostItNoteModel.find(conditions, (err, postItNotes) => {
      if (err) {
        sendError(res, 'notFound');
      } else {
        sendResponse(res, postItNotes);
      }
      db.close();
    });
  });
}


function add(req, res/* , next*/) {
  const updates = req.body;

  // make sure ID is not present, this is a new item
  delete updates._id; // eslint-disable-line no-underscore-dangle

  // prepare DB
  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;

  db.on('error', () => {
    sendError(res, 'errorOpeningDbConnection');
  });
  db.once('open', (/* callback*/) => {
    const postItNote = new PostItNoteModel(updates);

    // save to db
    postItNote.save((err/* , fluffy*/) => {
      if (err) {
        sendError(res, 'errorWithSavingPostItNote');
      } else {
        sendResponse(res, postItNote);
      }
      db.close();
    });
  });
}

function remove(req, res/* , next */) {
  const postItNoteId = req.params.id;

  // validate
  if (!postItNoteId) {
    sendError(res, 'emptyParams');
    return;
  }

  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;

  db.on('error', () => {
    sendError(res, 'errorOpeningDbConnection');
  });
  db.once('open', (/* callback*/) => {
    const conditions = {
      _id: postItNoteId,
    };

    // remove from db
    PostItNoteModel.remove(conditions, (err, removed) => {
      if (!removed) {
        sendError(res, 'errorRemovingFromDb');
      } else {
        sendResponse(res, removed);
      }
      db.close();
    });
  });
}

function edit(req, res/* , next */) {
  const postItNoteId = req.params.id;

  // validate
  if (!postItNoteId) {
    sendError(res, 'emptyParams');
    return;
  }

  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;

  db.on('error', () => {
    sendError(res, 'errorOpeningDbConnection');
  });
  db.once('open', (/* callback*/) => {
    const conditions = {
      _id: postItNoteId,
    };

    PostItNoteModel.update(conditions, req.body, (err/* , raw*/) => {
      if (err) {
        sendError(res, 'updatingDb', req.body);
      } else {
        sendResponse(res, req.body);
      }
      db.close();
    });
  });
}

export default {
  index,
  get,
  add,
  remove,
  edit,
};
