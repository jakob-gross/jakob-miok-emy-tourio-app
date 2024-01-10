export const commentSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", placeSchema);

export default Comment;
