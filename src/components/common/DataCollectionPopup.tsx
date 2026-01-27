"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import BasicButton from "./Button";

const DataCollectionPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen and closed this popup
    const hasSeenPopup = localStorage.getItem("hasSeenDataPopup");
    if (!hasSeenPopup) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Store in localStorage so it doesn't show again this session/device
    localStorage.setItem("hasSeenDataPopup", "true");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="data-collection-title"
      aria-describedby="data-collection-description"
      // A11y: Makes the modal pop up smoothly but keeps focus inside
      PaperProps={{
        sx: { borderRadius: 2, p: 2 },
      }}
    >
      <DialogTitle id="data-collection-title" sx={{ fontWeight: 700 }}>
        College Score Needs Your Help!
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="data-collection-description">
          <Typography
            variant="body1"
            component="span"
            sx={{ color: "text.primary", mb: 2, display: "block" }}
          >
            This project is currently in its{" "}
            <strong>Data Collection Phase</strong>. We rely on reviews from
            students like you to build a comprehensive database of college
            experiences. Taking 5 minutes to share your experience can help
            thousands of future students find the college that will best support
            their unique identity and accessibility needs. Thank you for
            supporting our mission to pass on your accessibility experiences to
            future students!
          </Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", gap: 1, p: 3 }}>
        <BasicButton
          text="Add a Review Now"
          href="/add-review"
          onClick={handleClose}
          sx={{ width: "100%" }}
        />
        <Box
          component="button"
          onClick={handleClose}
          sx={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "grayscale.main",
            textDecoration: "underline",
            fontSize: "0.875rem",
            "&:hover": { color: "grayscale.dark" },
          }}
        >
          Maybe later
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DataCollectionPopup;
