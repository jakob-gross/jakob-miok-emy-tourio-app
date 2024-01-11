import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");
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
    await Place.findByIdAndUpdate(id, updatedData);

    response.status(200).json({ message: "Success!" });
  }
}
