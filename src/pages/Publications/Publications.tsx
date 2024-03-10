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
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const titleHandler = (e: any) => {
    setTitle(e?.target?.value);
  };
  const bodyHandler = (e: any) => {
    setBody(e?.target?.value);
  };
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_PUBLICATIONS, {
    variables: { userId },
  });
  const sendForm = (e: any) => {
    e.preventDefault();
    console.log(title, body);
    addPublication({
      variables: {
        input: {
          title: title,
          body: body,
        },
      },
    });
  };
  const [addPublication] = useMutation(ADD_PUBLICATION, {
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
          <form onSubmit={sendForm}>
            <p>Создать публикацию</p>
            <input
              value={title}
              onChange={titleHandler}
              className={styles.titleField}
            ></input>
            <input
              value={body}
              onChange={bodyHandler}
              className={styles.bodyField}
            ></input>
            <button className={styles.formButton}>Создать</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Publications;
