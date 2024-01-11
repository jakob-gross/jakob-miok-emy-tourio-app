import styled from "styled-components";
import { useRouter } from "next/router";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { Fragment } from "react";

export default function Comments({ locationName, comments }) {
  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  const router = useRouter();
  const { id } = router.query;

  console.log("place id", id);

  async function handleSubmitComment(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const commentData = Object.fromEntries(formData);

    console.log("commentData", commentData);

    const response = await fetch(`/api/places/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }
  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment }, idx) => {
            return (
              <Fragment key={idx}>
                <p>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </Fragment>
            );
          })}
        </>
      )}
    </Article>
  );
}
