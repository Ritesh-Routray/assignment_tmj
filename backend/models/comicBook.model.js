import mongoose from "mongoose";

// Comic Book Schema
const comicBookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  authorName: { type: String, required: true },
  yearOfPublication: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  numberOfPages: { type: Number, required: true },
  condition: { type: String, required: true }, // e.g., 'new', 'used'
  description: { type: String, default: '' },
},
{timestamps: true});

// Model
const ComicBook = mongoose.model('ComicBook', comicBookSchema);

export default ComicBook;