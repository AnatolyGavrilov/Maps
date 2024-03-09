import { Box, Button, Modal, Typography } from "@mui/material";
import PublicationsList from "modules/Publications/components/PublicationsList/PublicationsList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  GET_PUBLICATIONS,
  ADD_PUBLICATION,
} from "api/publications/publications";
import { useMutation, useQuery } from "@apollo/client";
import { MuiSxStyle } from "./MuiSxStyles";

const Publications = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_PUBLICATIONS, {
    variables: { userId },
  });
  const [addPublication, { data: dataT, loading: loadingT, error: errorT }] =
    useMutation(ADD_PUBLICATION, {
      update(cache: any, { data: { createPost } }: any) {
        const publicationsCache = cache.readQuery({
          query: GET_PUBLICATIONS,
          variables: { userId },
        });
        cache.writeQuery({
          query: GET_PUBLICATIONS,
          data: {
            user: {
              posts: {
                data: [createPost, ...publicationsCache.user.posts.data],
              },
            },
          },
          variables: { userId },
        });
      },
    });
  console.log(data);
  const handleOpen = () => {
    setOpen(true);
    addPublication({
      variables: {
        input: {
          title: "titleRef.current.value",
          body: "bodyRef.current.value",
        },
      },
    });
  };
  return (
    <div>
      {!loading && (
        <div>
          <div className={styles.wrapper}>
            <h1>Публикации пользователя</h1>
            <Button
              onClick={handleOpen}
              className={styles.addPublicationButton}
              variant="contained"
            >
              Добавить публикацию
            </Button>
          </div>
          <PublicationsList publications={data?.user?.posts?.data} />
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
