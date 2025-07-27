import mongoose , {Schema, model} from "mongoose";

const noteSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
  
}, { timestamps: true });

const NoteModel = mongoose.model.Note || model("Note", noteSchema);

export default NoteModel
