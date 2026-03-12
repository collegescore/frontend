import { Box } from "@mui/material";

interface ScreenReaderAnnouncementProps {
  message: string;
  politeness?: "polite" | "assertive";
  atomic?: boolean;
  role?: "status" | "alert";
}

export default function ScreenReaderAnnouncement({
  message,
  politeness = "polite",
  atomic = true,
  role = "status",
}: ScreenReaderAnnouncementProps) {
  return (
    <Box
      component="p"
      role={role}
      aria-live={politeness}
      aria-atomic={atomic}
      sx={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {message}
    </Box>
  );
}
