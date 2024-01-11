import Place from "../../../db/models/Places";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.find();
    return response.status(200).json(place);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();
      return response
        .status(201)
        .json({ status: "Place successfully created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
