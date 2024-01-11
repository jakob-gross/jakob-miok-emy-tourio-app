import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    console.log("Place edited (but not really...)");

    place.preventDefault();

    const formData = new FormData(place.target);
    const placeData = Object.fromEntries(formData);
// console.log("place data", placeData)

    const response = await fetch("/api/places", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });

    mutate();
    place.target.reset();


    if (!response.ok) {
      console.error(response.status);
      return;
    }

    
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={'edit-place'} defaultData={place} />
    </>
  );
}
