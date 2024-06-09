import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {
  Button,
  Dialog,
  IconButton,
  Snackbar,
  Alert,
  Autocomplete,
  TextField,
  Box,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddRecomendationModal from "./modal";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import BasicModal from "./modal";

export default function BookList({
  data,
  handleAddRecommendation,
  handleRemoveRecommendation,
  filter,
}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackStyle, setSnackStyle] = React.useState("");
  const [booklist, setBooklist] = React.useState([]);
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  // Determine the number of columns based on the screen size
  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 5;
  };

  React.useEffect(() => {
    if (filter === "recommended") {
      data = data.filter((item) => item.recommended);
    }
    setBooklist(data);
  }, [filter, data]);
  const handleClickOpen = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddRecommendationWithSnackbar = (book) => {
    handleAddRecommendation(book);
    setSnackbarMessage(`${book.title} has been added to the reading List.`);
    setSnackStyle("success");
    setModalOpen(false);
    setSnackbarOpen(true);
  };
  const handleRemoveRecommendationWithSnackbar = (book) => {
    handleRemoveRecommendation(book);
    setSnackbarMessage(`${book.title} has been removed from the Reading List.`);
    setSnackStyle("error");
    setModalOpen(false);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        {" "}
        <Autocomplete
          id="book_selector"
          sx={{ width: 500 }}
          options={booklist}
          onChange={(_, value) => handleClickOpen(value)}
          autoHighlight
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="70"
                srcSet={option.coverPhotoURL}
                src={option.coverPhotoURL}
                alt=""
              />
              <strong>{option.title}</strong>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find a Book"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>

      <ImageList cols={getCols()} gap={18}>
        {booklist.map((item) => (
          <ImageListItem
            sx={{ cursor: "pointer", borderRadius: "60px" }}
            key={item.title}
            gap={18}
            onClick={() => handleClickOpen(item)}
          >
            <img
              srcSet={`${item.coverPhotoURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.coverPhotoURL}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{
                    color: item.recommended
                      ? "rgb(250, 189, 51)"
                      : "rgba(255, 255, 255, 0.54)",
                  }}
                  aria-label={`info about ${item.title}`}
                >
                  {item.recommended ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {selectedBook && (
        <BasicModal
          addRecomendation={() =>
            handleAddRecommendationWithSnackbar(selectedBook)
          }
          removeRecomendation={() =>
            handleRemoveRecommendationWithSnackbar(selectedBook)
          }
          open={modalOpen}
          onClose={handleClose}
          book={selectedBook}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackStyle}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
