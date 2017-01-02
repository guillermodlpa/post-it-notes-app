import mongoose from 'mongoose';

// declare schema
const postItNotesSchema = mongoose.Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  coords: {
    x: {
      type: Number,
      default: -1,
    },
    y: {
      type: Number,
      default: -1,
    },
  },
});

// create model
export default mongoose.model('PostItNote', postItNotesSchema);
