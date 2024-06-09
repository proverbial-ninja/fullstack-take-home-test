import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BasicModal = ({
  open,
  onClose,
  book,
  addRecomendation,
  removeRecomendation,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent dividers>
        <img width={400} src={book.coverPhotoURL} alt={book.title} />
        <Typography gutterBottom>
          <strong>Author: </strong> {book.author}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {book.recommended ? (
          <Button color="error" autoFocus onClick={removeRecomendation}>
            Remove From Reading List
          </Button>
        ) : (
          <Button autoFocus onClick={addRecomendation}>
            Add To Reading List
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BasicModal;
