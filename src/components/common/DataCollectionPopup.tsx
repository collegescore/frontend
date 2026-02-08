"use client";

import { useState, useEffect } from "react";
import AddReviewButton from "./AddReviewButton";
import BasicButton from "./BasicButton";
import Paragraph from "@/components/common/Paragraph";
import GenericPopup from "@/components/common/GenericPopup";

export default function DataCollectionPopup() {
  const [open, setOpen] = useState(false);

  // Only show the popup if the user hasn't seen it before (checked via localStorage)
  useEffect(() => {
    if (!localStorage.getItem("hasSeenDataCollectionNotice")) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenDataCollectionNotice", "true");
    setOpen(false);
  };

  return (
    <GenericPopup
      id="data-collection"
      open={open}
      onClose={handleClose}
      title="College Score Needs Your Help!"
      actions={
        <>
          <AddReviewButton text="Add a Review Now" onClick={handleClose} />
          <BasicButton text="Learn More" href="/about" color="grayscale" onClick={handleClose} />
        </>
      }
    >
      <Paragraph sx={{ textAlign: "center", mb: 0 }}>
        CollegeScore is currently in its{" "}
          <strong>Data Collection Phase</strong>. We rely on anonymus reviews
          from students like you to build a comprehensive database of college
          experiences. Taking 5 minutes to share your experience can help
          thousands of future students find the college that will best support
          their unique identity and accessibility needs. Thank you for
          supporting our mission to pass on your accessibility experiences to
          future students!
      </Paragraph>
    </GenericPopup>
  );
}