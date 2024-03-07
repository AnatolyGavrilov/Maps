import { Box, Button, Modal, Typography } from "@mui/material";
import PublicationsList from "modules/Publications/components/PublicationsList/PublicationsList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { client } from "api";
import {
  GET_PUBLICATIONS,
  ADD_PUBLICATION,
} from "api/publications/publications";
import { gql, useQuery } from "@apollo/client";

const Publications = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_PUBLICATIONS, {
    variables: { userId },
  });
  if (!loading) {
    console.log(data);
  }
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

  const publications = data?.user?.posts?.data;

  return (
    <div>
      {!loading && (
        <div>
          <div className={styles.wrapper}>
            <h1>Публикации пользователя</h1>
            <Button
              // onClick={handleOpen}
              className={styles.addPublicationButton}
              variant="contained"
            >
              Добавить публикацию
            </Button>
          </div>
          <PublicationsList publications={publications} />
        </div>
      )}
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
