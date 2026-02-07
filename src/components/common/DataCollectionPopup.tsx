"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import AddReviewButton from "./AddReviewButton";
import BasicButton from "./BasicButton";
import Paragraph from "@/components/common/Paragraph";

export default function DataCollectionPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen this
    const hasSeen = localStorage.getItem("hasSeenDataCollectionNotice");
    if (!hasSeen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenDataCollectionNotice", "true");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="data-popup-title"
      aria-describedby="data-popup-description"
      // Makes it look a bit more modern/rounded
      PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
    >
      <DialogTitle
        id="data-popup-title"
        sx={{ fontWeight: 800, textAlign: "center" }}
      >
        College Score Needs Your Help!
      </DialogTitle>

      <DialogContent id="data-popup-description">
        <Paragraph sx={{ textAlign: "center", mb: 0 }}>
          CollegeScore is currently in its{" "}
          <strong>Data Collection Phase</strong>. We rely on anonymus reviews from
          students like you to build a comprehensive database of college
          experiences. Taking 5 minutes to share your experience can help
          thousands of future students find the college that will best support
          their unique identity and accessibility needs. Thank you for
          supporting our mission to pass on your accessibility experiences to
          future students!
        </Paragraph>
      </DialogContent>

      {/* Stack buttons horizontally and center them */}
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2, px: 3 }}>
        <AddReviewButton 
          text="Add a Review Now" 
          variant="contained" 
          color="primary"
          onClick={handleClose}
        />
        <BasicButton 
          text="Learn More" 
          href="/about" 
          color="grayscale"
          onClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
}
