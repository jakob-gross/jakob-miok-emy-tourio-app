// import { db_places } from "../../../../lib/db_places";
// import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.findById(id);
    return response.status(200).json(place);
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ message: "Success!" });
  }

  if (request.method === "PATCH") {
    console.log("id testing", id);
    const updatedData = request.body;
    console.log("updatedData", updatedData);
    const something = await Place.findByIdAndUpdate(id, updatedData);

    response.status(200).json({ message: "Success!" });
  }

  // const place = place.find((place) => place._id.$oid === id);
  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = Comment.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // // );

  // if (!place) {
  //   return response.status(404).json({ status: "Not found" });
  // }

  // response.status(200).json({ place: place, comments: comments });
}
