"use client";

import { useState, useEffect } from "react";
import AddReviewButton from "./AddReviewButton";
import BasicButton from "./BasicButton";
import Paragraph from "@/components/common/Paragraph";
import GenericPopup from "@/components/common/GenericPopup";
import EmailSubscription from "@/components/common/EmailSubscription";
import { Box, Divider, Stack, Typography } from "@mui/material";

export default function DataCollectionPopup() {
  // only show the popup if the user hasn't seen it before (stored in localStorage)
  const [open, setOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("hasSeenDataCollectionNotice");
    }
    return false;
  });

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
    >
      <Stack spacing={3} alignItems="center" sx={{ textAlign: "center" }}>
        <Paragraph>
          We&apos;re currently in our data collection phase, gathering responses from{" "}
          <strong>University of Washington students</strong>. Taking 5 minutes
          to anonymously share your accessibility experience can support
          thousands of future students. Thank you for your contribution!
        </Paragraph>

        <AddReviewButton text="Add a Review Now" onClick={handleClose} />

        <Paragraph>
          <strong>Not a UW student?</strong> Stay in touch— we&apos;ll reach out
          when we&apos;re ready to expand to other schools.
        </Paragraph>

        <EmailSubscription buttonColor="grayscale" />
      </Stack>
    </GenericPopup>
  );
}
