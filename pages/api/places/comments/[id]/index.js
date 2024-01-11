import dbConnect from "../../../../../db/connect";
import Comment from "../../../../../db/models/Comments";
import Place from "../../../../..//db/models/Places";

export default async function handler(request, response) {
  try {
    const { id } = request.query;

    if (!id || typeof id !== "string") {
      return response.status(400).json({ error: "Invalid 'id' parameter." });
    }
    console.log("iddddd", id);

    await dbConnect();

    if (request.method === "POST") {
      try {
        const commentData = request.body;

        if (!commentData || typeof commentData !== "object") {
          return response.status(400).json({ error: "Invalid comment data." });
        }

        console.log("commentData", commentData);

        const comment = new Comment(commentData);
        console.log(comment, "this is the comment");
        await comment.save();

        console.log("comment saved");

        await Place.findByIdAndUpdate(id, { $push: { comments: comment._id } });

        console.log("Place updated");

        return response.status(201).json({ status: "Comment created." });
      } catch (error) {
        console.error("Error:", error);
        return response.status(400).json({ error: error.message });
      }
    } else {
      return response.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
