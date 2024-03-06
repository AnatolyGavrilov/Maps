import { Box, Button, Modal, Typography } from "@mui/material";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import PublicationsList from "modules/Publications/components/PublicationsList/PublicationsList";
import {
  createPublicationThunk,
  getPublicationsThunk,
} from "modules/Publications/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { client } from "api";
import { publicationsCreate } from "api/publications/publicationsGet";
import { gql } from "@apollo/client";

const Publications = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const publications = useAppSelector(
    (state) => state.publications.publications
  );
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getPublicationsThunk(userId));
    }
  }, [dispatch, userId]);

  const MuiSxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleTestClick = async () => {
    const data = await client.mutate({
      mutation: gql`
        mutation ($input: CreatePostInput!) {
          createPost(input: { title: "test", body: "jest" }) {
            variables: {
              name: "testt"
              title: "test"
              body: "jest"
            }
            id
            title
            body
          }
        }
      `,
    });
    console.log("inComponent", data);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <h1>Публикации пользователя</h1>
        <Button
          // onClick={handleOpen}
          onClick={handleTestClick}
          className={styles.addPublicationButton}
          variant="contained"
        >
          Добавить публикацию
        </Button>
      </div>
      <PublicationsList publications={publications} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MuiSxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Publications;
