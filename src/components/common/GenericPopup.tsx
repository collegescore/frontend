import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface GenericPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  id: string;
}

const GenericPopup = ({
  open,
  onClose,
  title,
  children,
  actions,
  id,
}: GenericPopupProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 3, p: 2, position: "relative" } }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          left: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        id={`${id}-title`}
        sx={{ fontWeight: 800, textAlign: "center", pt: 4 }}
      >
        {title}
      </DialogTitle>

      <DialogContent id={`${id}-description`}>{children}</DialogContent>

      {actions && (
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2, px: 3 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default GenericPopup;
