import mongoose from "mongoose";
const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  mapURL: { type: Number, required: true },
  description: { type: String, required: true },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
